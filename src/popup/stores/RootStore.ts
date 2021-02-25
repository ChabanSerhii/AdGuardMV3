import { reaction } from 'mobx';
import { SettingsStore } from './SettingsStore';
import { WizardStore } from './WizardStore';

export class RootStore {
    public settingsStore: SettingsStore;

    public wizardStore: WizardStore;

    constructor() {
        this.settingsStore = new SettingsStore(this);
        this.wizardStore = new WizardStore(this);

        reaction(
            () => this.settingsStore.protectionPauseExpires,
            () => this.settingsStore.resetCurrentTime(),
            {
                equals: (prevValue: number, value: number) => {
                    if (value === 0 && prevValue !== 0) {
                        return false;
                    }
                    return true;
                },
            },
        );
    }
}
