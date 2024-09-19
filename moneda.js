const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';  // API pública gratuita para prueba

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultElement = document.getElementById('result');
const convertButton = document.getElementById('convertBtn');

let exchangeRates = {};

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error fetching currency data');
        const data = await response.json();
        exchangeRates = data.rates;
        populateCurrencySelectors(Object.keys(exchangeRates));
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar la información de las monedas.');
    }
}

function populateCurrencySelectors(currencies) {
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromCurrencySelect.appendChild(option);
        toCurrencySelect.appendChild(option.cloneNode(true));
    });

    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
}

async function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor ingresa una cantidad válida.');
        return;
    }

    try {
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
        const result = (amount * rate).toFixed(2);
        resultElement.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conversión de monedas.');
    }
}

convertButton.addEventListener('click', convertCurrency);

// Cargar las monedas al iniciar
fetchCurrencies();
