import { useState, useEffect } from 'react';
import { titleCase } from './functions';
import dayjs from 'dayjs';

export function useGetShoppingLists() {
    const { lists, isLoading, hasError } = useGetSupermarketList();
    const { clickedListItems, handleClickedListItems, setInitialLists } = useClickedListItems();
    const [ fetchedLists, setFetchedLists ] = useState(false);

    useEffect(() => {

        if (!!lists.length && !fetchedLists) {
            setFetchedLists(true);
            const listTitles = lists.map(({ title }) => title);
            setInitialLists(listTitles);
        }
        
    }, [lists, setFetchedLists, setInitialLists, fetchedLists]);

    return {
        itemsLists: lists,
        isLoading,
        hasError,
        clickedListItems,
        handleClickedListItems,
    }
}

export function useClickedListItems() {

    const [ lists, setLists ] = useState([]);

    const setInitialLists = (initialTitles) => {
        const initialLists = [];

        initialTitles.forEach((title) => {
            const list = 
                { 
                    title,
                    items: [],
                };

            initialLists.push(list);
        });

        setLists(initialLists);
    }

    const handleClickedListItems = ({ listName, item }) => {

        const cloneLists = lists.slice();

        const list = cloneLists.find(({ title }) => listName === title);
        const listId = cloneLists.indexOf(list);

        if (!list) return console.error('This list name does not exist');

        if (list.items.includes(item)) {

            const itemId = list.items.indexOf(item);

            list.items.splice(itemId, 1);
            cloneLists.splice(listId, 1, list);
            return setLists(cloneLists);
        }

        cloneLists[listId].items.push(item);
        return setLists(cloneLists);

    }

    return {
        handleClickedListItems,
        clickedListItems: lists,
        setInitialLists,
    };
}

export function useFetch({ url = null, opts = null } = {}) {

    const [ response, setResponse ] = useState(null);
    const [ isLoading, setLoading ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ URL, setURL ] = useState(url);
    const [ options, setOptions ] = useState(opts);

    useEffect(() => {

        if (URL) {

            setLoading(true);

        fetch(URL, options)
            .then ((res) => {
                setResponse(res);
                setLoading(false);
            })
            .catch(err => {
                setHasError(true);
                setLoading(false);
            })

        }

    }, [URL, options]);

    return {
        response,
        isLoading,
        hasError,
        setURL,
        setOptions,
        setResponse,
    }
}

export function usePostSelectedList() {

    const { response, isLoading, hasError, setResponse, setURL, setOptions } = useFetch();

    const backendURI = 'https://script.google.com/macros/s/AKfycbyeiFUJm_sDBoeZ5hVlaZ1_x2GaqTk84psfvLFY7wPnl1T93_cJ/exec?';

    const sendData = (params) => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: 'supermarket list',
        };
        const URL = `${backendURI}${params.join('&')}`;

        setURL(URL);
        setOptions(options);
    };

    useEffect(() => {

        if (response) setResponse(response);
        
    });

    return {
        sendData,
        response,
        isLoading,
        hasError,
    }


}

export function useGetSupermarketList() {
    
    const URI = 'https://script.googleusercontent.com/macros/echo?user_content_key=U70fraSTrkzK2cZ67IDpq2TWSTfyZ3fODODRHAJ0BaUQwWAfJQIi7sAilHkf3zzSN_-6rfmEm1U2tsODNs8GsNT--n9nYep5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBQKZ-gsI57epSqBg37ie3dLwE3rqnFw65A_ZYWhsQ0eaEXwKe7o5cYuvLzojM2yxCgSnIyRiM57&lib=MFGE_eDPF_Owrc-pXk-IGVwbFAisXPvym'
    const { response, isLoading, hasError } = useFetch({ url: URI });
    const [ lists, setLists] = useState([]);

    useEffect(() => {

        if (response) {
            response.json()
                .then((res) => {

                    const supermarketList = res.supermarket_list.slice();

                    const lists = supermarketList.map((list) => {
                        const listClone = Object.assign({}, list);
                        const listTitle = titleCase(listClone.title);
                
                        listClone.title = listTitle;
                
                        return listClone;
                    });
            
                    setLists(lists);

                })
            
        }

    }, [response]);



    return {
        lists,
        isLoading,
        hasError,
    };
}

export function useInput(initialValue, validCb = () => {}) {
    const [ value, setInputValue ] = useState(initialValue);
    const [ isValid, setIsValid ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(false);

    const onChange = (ev) => {
        setInputValue(ev.target.value);

        const { status: isValidInput, message } = validCb(ev.target.value);

        if (!isValid && isValidInput) {

            setIsValid(isValidInput);
            setErrorMessage(message);
        }

        return;
    }

    const checkIsValid = () => {
        const { status: isValidInput, message } = validCb(value);

        setIsValid(isValidInput);
        setErrorMessage(message);

        return isValidInput;
    }

    return {
        value,
        handler: onChange,
        isValid,
        checkIsValid,
        errorMessage,
    }

}

export function useEmailInputChange(initialValue) {

    const inputProps = useInput(initialValue, validateEmail);

    function validateEmail(email) {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const status = re.test(String(email).toLowerCase());

        return {
            status,
            message: 'Invalid Email',
        };
    }
    
    return inputProps;

} 

export function useDateInputChange(initialValue) {

    const inputProps = useInput(initialValue, validateDate);

    const today = dayjs().format('YYYY-MM-DD');

    function validateDate(dateValue) {

        const status = {
            status: true,
            message: null,
        }
        
        if (dateValue < today) {
            
            return {
                status: false,
                message: 'Date should be today or in a future day',
            };
        }

        return status;
    }

    return inputProps;

} 