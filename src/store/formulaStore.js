import {create} from "zustand";

const formulaStore = create((set) => ({
    isVariantsVisible: false,
    calculationSequence: [],
    currentOperand: [],
    inputError: false,
    changeVariantsVisibility: (status) => set((state) => ({isVariantsVisible: status})),
    setCurrentOperand: (operand) => set((state) => ({currentOperand: operand})),
    addCalculationSequence: (value) => {
        return set((state) => {
            let newCalculationSequence = state.calculationSequence;
            newCalculationSequence.push(value);
            return {calculationSequence: newCalculationSequence}
        });
    },
    setInputError: (error) => set((state) => ({inputError: error})),
}));

export default formulaStore;