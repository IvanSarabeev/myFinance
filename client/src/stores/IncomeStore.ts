import {action, makeObservable, observable, runInAction} from "mobx";
import {Income} from "@/types/features/income/api";
import {IncomeSourceLabels} from "@/types/features/defaults";
import { createIncome, getIncomeList } from "@/app/api/income";
import { ApiErrorResponse } from "@/types/defaultApi";
import commonStore from "./CommonStore";
import { NOTIFICATION_TYPES } from "@/types/defaults";

const {DESTRUCTIVE} = NOTIFICATION_TYPES;

class IncomeStore {
    isLoading = false;
    incomes: Income[] = [];
    errorMessages: string[] = [];
    error: ApiErrorResponse | null = null;
    
    /**
     * form state (create income)
    */
   incomeForm: Partial<Income> = {
       icon: '',
       source: "" as keyof typeof IncomeSourceLabels,
       amount: 0,
       date: new Date,
    };
    
    isDownloadingReport = false;
    
    constructor() {
        makeObservable(this, {
            isLoading: observable,
            incomes: observable,
            incomeForm: observable,
            errorMessages: observable,
            error: observable,

            fetchIncomes: action,
            validateIncomeForm: action,
            addIncome: action,
            deleteIncome: action,
            downloadIncomeReport: action,
            updateIncome: action,
            setFormField: action,
            resetForm: action
        });
    }

    fetchIncomes = async () => {
        this.isLoading = true;
        this.errorMessages = [];

        try {
            const response = await getIncomeList();

            runInAction(() => {
                this.incomes = response;
            });
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            const message = String(this.error.response?.error || "Missing incomes.");

            commonStore.openNotification(DESTRUCTIVE, "Failed to load income list", message);

            throw error;
        } finally {
            runInAction(() => this.isLoading = false);
        }
    }

    validateIncomeForm() {
        if (this.incomeForm.source?.trim().length === 0) {
            this.errorMessages.push("Income source is required.");
        }

        if (!this.incomeForm.amount || isNaN(this.incomeForm.amount) || this.incomeForm.amount <= 0) {
            this.errorMessages.push("Amount should be a valid number greater than 0.");
        }

        if (this.incomeForm.date && isNaN(new Date(this.incomeForm.date).getTime())) {
            this.errorMessages.push("Date is invalid.");
        }

        if (this.incomeForm.icon && this.incomeForm.icon.trim().length === 0) {
            this.errorMessages.push("Icon is invalid.");
        }

        return this.errorMessages.length === 0;
    };

    addIncome = async () => {
        this.isLoading = true;
        this.errorMessages = [];

        try {
            this.validateIncomeForm();

            if (this.errorMessages.length > 0) {
                const errorMsg = this.errorMessages.length > 1
                    ? this.errorMessages.join('\n')
                    : this.errorMessages[0];
                
                commonStore.openNotification(DESTRUCTIVE, "Failed to add income", errorMsg);
                return;
            }

            const data = {
                ...this.incomeForm,
                source: this.incomeForm.source?.trim().toUpperCase() as Income["source"],
            };

            const incomeResponse = await createIncome(data);

            if (incomeResponse.status) {
                commonStore.openNotification("success", "Income added successfully", "New income has been added.");

                runInAction(() => {
                    this.incomes.unshift(incomeResponse.data);
                    this.resetForm();
                });
            }

        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            const message = String(this.error.response?.error || "Missing incomes.");

            commonStore.openNotification(DESTRUCTIVE, "Failed to load income list", message);

            throw error;
        } finally {
            runInAction(() => this.isLoading = false);
        }
    }

    async deleteIncome() {

    }

    async downloadIncomeReport() {

    }

    async updateIncome() {

    }

    setFormField = <K extends keyof Income>(field: K, value: Income[K]) => {
        this.incomeForm[field] = value;
    }

    resetForm() {
        this.incomeForm = {
            icon: '',
            source: '' as keyof typeof IncomeSourceLabels,
            amount: 0,
            date: new Date(),
        }
    }
}

const incomeStore = new IncomeStore();

export default incomeStore;