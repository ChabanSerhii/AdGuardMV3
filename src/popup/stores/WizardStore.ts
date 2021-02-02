import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';

import { SETTINGS_NAMES } from 'Common/settings-constants';
import type { RootStore } from './RootStore';

const INITIAL_STEP = 1;
const LAST_STEP = 4;

interface StepInfo {
    nameKey: string;
    descriptionKey: string;
    icon: string;
}

const stepInfoMap: { [key: number]: StepInfo } = {
    1: {
        nameKey: 'popup_steps_experimental_title',
        descriptionKey: 'popup_steps_experimental_description',
        icon: 'experiment',
    },
    2: {
        nameKey: 'popup_steps_new_tech_title',
        descriptionKey: 'popup_steps_new_tech_description',
        icon: 'new_tech',
    },
    3: {
        nameKey: 'popup_steps_fast_work_title',
        descriptionKey: 'popup_steps_fast_work_description',
        icon: 'fast_work',
    },
    4: {
        nameKey: 'popup_steps_v3_manifest_title',
        descriptionKey: 'popup_steps_v3_manifest_description',
        icon: 'chrome_logo',
    },
};

export class WizardStore {
    public rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @observable step = INITIAL_STEP;

    @computed get isLastStep() {
        return this.step === LAST_STEP;
    }

    @computed get stepInfo() {
        return stepInfoMap[this.step];
    }

    @computed get buttonTextKey() {
        switch (this.step) {
            case LAST_STEP:
                return 'popup_wizard_start_button';
            default:
                return 'popup_wizard_next_button';
        }
    }

    @action
    setStep = (step: number) => {
        this.step = step;
    };

    @action
    setNextStep = () => {
        this.step += 1;
    };

    @action
    skipWizard = async () => {
        await this.rootStore.settingsStore.setSetting(
            SETTINGS_NAMES.POPUP_V3_WIZARD_ENABLED,
            false,
        );
        runInAction(() => {
            this.step = INITIAL_STEP;
        });
    };
}
