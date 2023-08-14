"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function postData(entreprise) {
    const url = 'http://127.0.0.1:3000/entreprise';
    const data = entreprise;
    try {
        const response = await axios_1.default.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        else {
            console.error('Unknown error occurred.');
        }
    }
}
exports.default = postData;
