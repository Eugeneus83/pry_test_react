import {useRef} from 'react';
import formulaStore from "./store/formulaStore";
import Autocomplete from "./components/Autocomplete";

function App() {

    const formulaInputRef = useRef();

    const changeVariantsVisibility = formulaStore((state) => state.changeVariantsVisibility);

    const isVariantsVisible = formulaStore((state) => state.isVariantsVisible);

    const addCalculationSequence = formulaStore((state) => state.addCalculationSequence);

    const setCurrentOperand = formulaStore((state) => state.setCurrentOperand);

    const currentOperand = formulaStore((state) => state.currentOperand);

    const calculationSequence = formulaStore((state) => state.calculationSequence);

    const inputError = formulaStore((state) => state.inputError);

    const setInputError = formulaStore((state) => state.setInputError);

    const autocompleteHandler = (event) => {
        setInputError(null);
        const enteredInputValue = formulaInputRef.current.value.trim();
        if (event.keyCode === 13) {
            changeVariantsVisibility(false);
            if (currentOperand == ')') {
                addCalculationSequence(currentOperand);
            }
            formulaInputRef.current.value = '';
            return;
        }
        const operands = ['+', '-', '*', '/', '(', ')'];
        if (/^[0-9\+\-\*\/\(\)]+$/.test(enteredInputValue) === false) {
            setInputError('Please provide numbers only');
            formulaInputRef.current.value = '';
        }

        const firstSymbol = enteredInputValue.substr(0, 1);
        const lastSymbol = enteredInputValue.substr(enteredInputValue.length - 1);
        if (calculationSequence.length > 0 && !operands.includes(firstSymbol)) {
            setInputError('Please provide operand: ' + operands.join(','));
            formulaInputRef.current.value = '';
            return;
        }
        if (operands.includes(lastSymbol)) {
            setCurrentOperand(lastSymbol);
            changeVariantsVisibility(true);
        }
    }

    const valueSelectedHandler = (value) => {
        changeVariantsVisibility(false);
        const currentInputValue = formulaInputRef.current.value.replace(/[^0-9]+/, '').trim();
        if (currentInputValue) {
            addCalculationSequence(currentInputValue);
        }
        addCalculationSequence(currentOperand);
        addCalculationSequence(value);
        formulaInputRef.current.value = '';
    }

    let calculationResult = '';
    try {
        calculationResult = eval(calculationSequence.join(''));
    }catch (error) {
        calculationResult = 'Incorrect formula';
    }

    return (
        <main>
            <p>Result: <span>{calculationResult}</span></p>
            <p>Please provide some formula</p>
            {calculationSequence.map((value, index) =>
                <span key={index} className="formula-fragment">{value}</span>
            )}
            <input ref={formulaInputRef} onKeyUp={autocompleteHandler} type="text"/>
            {inputError && <p className="input-error">{inputError}</p>}
            {isVariantsVisible && <Autocomplete onValueSelected={valueSelectedHandler}/>}
        </main>
    );
}

export default App;
