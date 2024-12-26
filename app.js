"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
class Intesis extends homey_1.default.App {
    /**
     * onInit is called when the app is initialized.
     */
    async onInit() {
        await this.actionTemperature();
        await this.handleFlowThermostatMode();
        await this.handleFlowFanRate();
        await this.actionVaneUpDownPosition();
        await this.handleFlowRemote();
        this.log('Intesis has been initialized');
    }
    async actionTemperature() {
        this.homey.flow.getActionCard('temperature').registerRunListener(async ({ degrees, device }) => {
            try {
                await device.onSetPoint(degrees);
                return true;
            }
            catch {
                return false;
            }
        });
    }
    handleFlowThermostatMode() {
        this.homey.flow.getActionCard('thermostat_mode').registerRunListener(async ({ mode, device }) => {
            try {
                await device.onThermostatMode(mode);
                return true;
            }
            catch {
                return false;
            }
        });
        this.homey.flow.getConditionCard('thermostat_mode').registerRunListener(async ({ mode, device }) => {
            return mode === device.getState().thermostat_mode_mh;
        });
    }
    handleFlowRemote() {
        this.homey.flow.getActionCard('remote_true').registerRunListener(async ({ device }) => {
            try {
                await device.onRemoteSet(1);
                return true;
            }
            catch {
                return false;
            }
        });
        this.homey.flow.getActionCard('remote_false').registerRunListener(async ({ device }) => {
            try {
                await device.onRemoteSet(0);
                return true;
            }
            catch {
                return false;
            }
        });
        this.homey.flow.getConditionCard('remote').registerRunListener(async ({ mode, device }) => {
            return mode === device.getState().thermostat_mode_mh;
        });
    }
    handleFlowFanRate() {
        this.homey.flow.getActionCard('fanrate').registerRunListener(async ({ rate, device }) => {
            try {
                await device.onFanRate(rate);
                return true;
            }
            catch {
                return false;
            }
        });
        this.homey.flow.getConditionCard('fanrate').registerRunListener(async ({ when, device }) => {
            return when === device.getState().fan_rate_mh;
        });
    }
    actionVaneUpDownPosition() {
        this.homey.flow.getActionCard('vane_updown_position').registerRunListener(async ({ position, device }) => {
            try {
                await device.onVaneUpDownDirection(position);
                return true;
            }
            catch {
                return false;
            }
        });
    }
}
module.exports = Intesis;
