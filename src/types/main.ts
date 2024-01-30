type MenuItem = {
    name: string,
    icon: string,
    action: () => void
};

type Expense = {
    id: number | null;
    amount: number;
    date: string;
    description: string;
}

type EditorOptions = {
    active: boolean;
    expense: Expense | null;
}

type Theme = 'dark' | 'light';

export type { MenuItem, Expense, EditorOptions, Theme };
