import {useQuery} from '@tanstack/react-query';

const Autocomplete = (props) => {

    const retrieveValues = async () => {
        const response = await fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete", {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const values = await response.json();

        return {
            error: false,
            isLoading: false,
            values
        }
    };

    const {error, isLoading, data} = useQuery({
        queryKey: ['values'],
        queryFn: retrieveValues,
    });

    if (!data || !data.values) {
        return <ul></ul>;
    }

    const autoCompleteValues = data.values;

    const valueSelectHandler = (value) => {
        props.onValueSelected(value);
    };

    return <ul role="listbox" aria-labelledby="downshift-3313-label"
               className="absolute left-0 rounded bg-white px-2 py-3 shadow-lg">
        {autoCompleteValues.map((value, index) => {
            return <li key={index} className="relative cursor-pointer rounded p-2" role="option" aria-selected="true"
                       onClick={valueSelectHandler.bind(null, value.value)}>
                <div className="container flex flex-col">
                    <div className="font-sans text-gray-600 jss18">{value.value}</div>
                </div>
            </li>;
        })}
    </ul>
}

export default Autocomplete;