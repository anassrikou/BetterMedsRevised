'use strict';

class Meds {
    constructor() {
        this.mod = "Revingly-BetterMedsRevised";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.start.bind(this);
    }

    start() {

        // CONSTANTS
        const USE_TIME = 1;
        const HP_RESOURCE_RATE = 100;
        const ENERGY_EFFECT = -1;
        const HYDRATION_EFFECT = -1;

        // requires
        const config = require('./config.json');
        const medsIds = require('./itemIds.json');
        const database = DatabaseServer.tables;
        const items = database.templates.items;

        for (let item in items) {
            // update the meds HP
            if (items[item]._parent === "5448f39d4bdc2d0a728b4568" && (items[item]._props.MaxHpResource < 3000)) {
                items[item]._props.MaxHpResource = config.healingItemsCapacity;
                items[item]._props.medUseTime = USE_TIME;
                items[item]._props.hpResourceRate = HP_RESOURCE_RATE;
            }

            //Drugs - painkillers -
            if (items[item]._parent === "5448f3a14bdc2d27728b4569") {
                items[item]._props.MaxHpResource = config.painKillers.capacity;
                items[item]._props.medUseTime = USE_TIME;
                items[item]._props.effects_damage.Pain.duration = config.painKillers.duration;
                if (items[item]._props.effects_health.Energy) items[item]._props.effects_health.Energy.value = ENERGY_EFFECT;
                if (items[item]._props.effects_health.Hydration) items[item]._props.effects_health.Hydration.value = HYDRATION_EFFECT;
            }
        }

        // update the other med items
        Object.entries(medsIds).forEach(([key, value]) => {
            items[key]._props.MaxHpResource = config[value].capacity;
            items[key]._props.medUseTime = USE_TIME;
        });
    }
}

module.exports.Meds = Meds;