import {action, makeObservable, observable, runInAction} from "mobx";
import {Income} from "@/types/features/income/api";
import {IncomeSourceLabels} from "@/types/features/defaults";
import { getIncomeList } from "@/app/api/income";
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
            confirmIncome: action,
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

    async confirmIncome() {

    }

    async deleteIncome() {

    }

    async downloadIncomeReport() {

    }

    async updateIncome() {

    }

    setFormField<K extends keyof Income>(field: K, value: Income[K]) {
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