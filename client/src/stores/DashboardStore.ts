import { action, makeObservable, observable } from "mobx";
import { expenseDetails, incomeDetails } from "@/app/api/dashboard";
import commonStore from "./CommonStore";
import { NOTIFICATION_TYPES } from "@/types/defaults";
import { ApiErrorResponse } from "@/types/defaultApi";
import { IncomeDetails } from "@/types/features/income/api";
import { ExpenseDetails } from "@/types/features/expense/api";

class DashboardStore {
    incomeDetails: IncomeDetails | null = null;
    expenseDetails: ExpenseDetails | null = null;
    isLoading = false;
    error: ApiErrorResponse | null = null;

    constructor() {
        makeObservable(this, {
            incomeDetails: observable,
            expenseDetails: observable,
            isLoading: observable,
            error: observable,
            setIncomeDetails: action,
            setExpenseDetails: action,
            loadIncomeTransactions: action,
            loadExpenseTransactions: action,
            loadDashboardData: action,
        });
    }

    setIncomeDetails(details: IncomeDetails) {
        this.incomeDetails = details;
    }

    setExpenseDetails(details: ExpenseDetails) {
        this.expenseDetails = details;
    }

    loadIncomeTransactions = async () => {
        try {
            const response = await incomeDetails();

            console.log("Income transactions data:", response);

            this.setIncomeDetails(response);

            return this.incomeDetails;
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            const message = String(this.error.response?.error ?? "Income transactions data not found");
            
            commonStore.openNotification(NOTIFICATION_TYPES.DESTRUCTIVE, "Failed to load income transactions data", message);

            throw error;
        }
    }

    loadExpenseTransactions = async () => {
        try {
            const response = await expenseDetails();

            console.log("Expense transactions data:", response);

            this.setExpenseDetails(response);

            return this.expenseDetails;
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            const message = String(this.error.response?.error ?? "Expense transactions data not found");
            
            commonStore.openNotification(NOTIFICATION_TYPES.DESTRUCTIVE, "Failed to load income transactions data", message);

            throw error;
        }
    }

    loadDashboardData = async () => {
        this.isLoading = true;

        try {
            await Promise.all([
                this.loadIncomeTransactions(),
                this.loadExpenseTransactions()
            ]);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            this.isLoading = false;
        }
    }
}

const dashboardStore = new DashboardStore();

export default dashboardStore;