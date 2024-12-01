const RESET_STATE = false;

function getUrlParams(url) {
    const params = {};
    const parser = new URL(url);
    const queryString = parser.search.slice(1);
    const queryArray = queryString.split('&');

    queryArray.forEach(param => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return params;
}

const url = window.location.href;
const params = getUrlParams(url);
const settingId = params.id;

const selectors = {
    stateJson: '#state',
    emptyState: '.empty-state',
    titleInput: '#title-input',
    discardButton: '[aria-controls="discard"]',
    saveButton: '[aria-controls="save"]',
    toggleButton: '[aria-controls="toggle"]',
    formulasListWrapper: '.formulas',
    formulasList: '.formulas-list',
    formulaTemplate: '#formula-line-template',
    formula: '.formula-line',
    formulaTitle: '.formula-title',
    formulaEditButton: '[aria-controls="edit-formula"]',
    formulaRemoveButton: '[aria-controls="remove-formula"]',
};

function getState() {
    const existedState = localStorage.getItem('state');
    let state;
    if (existedState && !RESET_STATE) {
        state = JSON.parse(existedState);
    } else {
        const initialState = document.querySelector(selectors.stateJson).textContent;
        state = JSON.parse(initialState);
    }

    localStorage.setItem('state', JSON.stringify(state));
    return state;
}

const state = getState();

function updateState() {
    localStorage.setItem('state', JSON.stringify(state));
}

function getCurrentSetting() {
    const settingTemplate = {
        id: Date.now(),
        title: 'Setting title',
        status: 'draft',
        formulas: [],
    };

    let setting = state.settings.find((setting) => setting.id == settingId);

    if (!setting) {
        setting = { ...settingTemplate };
        state.settings.push(setting);
        updateState();
    }
    return setting;
}

let currentSettings = getCurrentSetting();
let savedSettings = { ...currentSettings };
let isEditing = false;

const titleInput = document.querySelector(selectors.titleInput);
const discardButton = document.querySelector(selectors.discardButton);
const saveButton = document.querySelector(selectors.saveButton);
const toggleButton = document.querySelector(selectors.toggleButton);
const formulasListElement = document.querySelector(selectors.formulasList);
const formulasListWrapper = document.querySelector(selectors.formulasListWrapper);

function toggleEmptyState() {
    const emptyStateElement = document.querySelector(selectors.emptyState);
    if (currentSettings?.formulas.length === 0) {
        emptyStateElement.classList.remove('hidden');
        formulasListWrapper.classList.add('hidden');
    } else {
        emptyStateElement.classList.add('hidden');
        formulasListWrapper.classList.remove('hidden');
    }
}

function editFormulaHandler(formula) {
    window.location.href = `/formula.html?id=${formula.id}&settingId=${currentSettings.id}`;
}

function removeFormulaHandler(formulaTemplateElement) {
    const formulaId = formulaTemplateElement.id;
    currentSettings.formulas = currentSettings.formulas.filter((formula) => formula.id != formulaId);
    formulaTemplateElement.remove();
    toggleEmptyState();
    updateState();
}

function renderFormulaElement(formula) {
    const isFormulaElementExist = document.getElementById(formula.id);
    if (isFormulaElementExist) return;

    const formulaTemplateElement = document.querySelector(selectors.formulaTemplate);
    const formulaTemplateElementCopy = formulaTemplateElement.cloneNode(true);
    formulaTemplateElementCopy.id = formula.id;
    const formulaTitleElement = formulaTemplateElementCopy.querySelector(selectors.formulaTitle);
    formulaTitleElement.innerText = formula.title;
    formulaTitleElement.href = `/formula.html?id=${formula.id}&settingId=${currentSettings.id}`;

    const formulaEditButtonElement = formulaTemplateElementCopy.querySelector(selectors.formulaEditButton);
    formulaEditButtonElement.addEventListener('click', (e) => {
        editFormulaHandler(formula);
    });
    const formulaRemoveButtonElement = formulaTemplateElementCopy.querySelector(selectors.formulaRemoveButton);
    formulaRemoveButtonElement.addEventListener('click', (e) => {
        removeFormulaHandler(formulaTemplateElementCopy);
    });
    formulaTemplateElementCopy.classList.remove('hidden');
    formulasListElement.appendChild(formulaTemplateElementCopy);
}

function renderPage() {
    toggleEmptyState();
    titleInput.value = currentSettings?.title;
    toggleButton.dataset.status = currentSettings?.status;
    currentSettings?.formulas.forEach((formula) => {
        renderFormulaElement(formula);
    });
}

function handleChanges() {
    if (isEditing) {
        discardButton.classList.remove('disabled');
        saveButton.classList.remove('disabled');
    } else {
        discardButton.classList.add('disabled');
        saveButton.classList.add('disabled');
    }
}

function titleEditHandler(title) {
    if (!title) return;
    isEditing = true;
    currentSettings.title = title;
    handleChanges();
}

function discardChangesHandler() {
    isEditing = false;
    currentSettings = { ...savedSettings };
    handleChanges();
    renderPage();
}

function toggleSettingHandler() {
    const settingStatus = currentSettings.status === 'active' ? 'draft' : 'active';
    currentSettings.status = settingStatus;
    toggleButton.dataset.status = settingStatus;
    updateState();
}

function saveChangesHandler() {
    isEditing = false;
    savedSettings = { ...currentSettings };
    handleChanges();
    updateState();
}

titleInput?.addEventListener('input', (event) => {
    titleEditHandler(event.target.value);
});

discardButton?.addEventListener('click', discardChangesHandler);
saveButton?.addEventListener('click', saveChangesHandler);
toggleButton?.addEventListener('click', toggleSettingHandler);

renderPage();
