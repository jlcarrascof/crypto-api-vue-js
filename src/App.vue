<script setup>
    import { ref, onMounted, reactive } from 'vue'
    import Alerta from './components/Alerta.vue'

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    const criptomonedas = ref([])
    const error = ref('')
    const cotizar = reactive({
        moneda: '',
        criptomoneda: '',
    })
    const cotizacion = ref({})
    
    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&limit=20';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(({Data}) => criptomonedas.value = Data)
    })

    const cotizarCripto = () => {
        // Checking that cotizar is full
        if (Object.values(cotizar).includes('')) {
            error.value = 'All fields are mandatory...'
            return
        }
        error.value = ''

        obtenerCotizacion()
    }

    const obtenerCotizacion = async () => {
        const { moneda, criptomoneda } = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const answer = await fetch(url)
        const data = await answer.json()

        console.log(data.DISPLAY[criptomoneda][moneda])
    }
</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Cryptocurrency <span>Price Ticker</span></h1>

        <div class="contenido">
            <Alerta v-if="error">
                {{ error }}
            </Alerta>
            <form 
                class="formulario"
                @submit.prevent="cotizarCripto"
            >
                <div class="campo">
                    <label for="moneda">Currency: </label>
                    <select 
                        id="moneda"
                        v-model="cotizar.moneda"
                    >
                        <option value="">-- Select --</option>
                        <option 
                            v-for="moneda in monedas" 
                            :value="moneda.codigo">
                                {{ moneda.texto }}
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label for="cripto">Criptocurrency: </label>
                    <select 
                        id="cripto"
                        v-model = "cotizar.criptomoneda"
                    >
                        <option value="">-- Select --</option>
                        <option 
                            v-for="criptomoneda in criptomonedas" 
                            :value="criptomoneda.CoinInfo.Name">
                                {{ criptomoneda.CoinInfo.FullName }}
                        </option>
                    </select>
                </div>

                <input type="submit" value="Price Quote" />

            </form>

        </div>
    </div>
</template>
