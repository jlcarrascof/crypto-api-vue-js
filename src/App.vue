<script setup>
    import { ref, onMounted, reactive, computed } from 'vue'
    import Alerta from './components/Alerta.vue'
    import Spinner from './components/Spinner.vue'
    import useCripto from './composables/useCripto'

    const { cotizarMoneda, auth } = useCripto()

    cotizarMoneda()

    console.log(auth)

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
    const cargando = ref(false)

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
        cargando.value = true
        cotizacion.value = {}

        try {
            const { moneda, criptomoneda } = cotizar
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

            const answer = await fetch(url)
            const data = await answer.json()

            cotizacion.value = data.DISPLAY[criptomoneda][moneda] 
        } catch (error) {
            console.log(error)     
        } finally {
            cargando.value = false
        }
    }

    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
    })    

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

            <Spinner 
                v-if="cargando"
            />

            <div class="contenedor-resultado" v-if="mostrarResultado">
                <h2>Price Quote</h2>

                <div class="resultado">
                    <img 
                        :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" 
                        alt="crypto image" 
                    />
                    <div>
                        <p>The price is: <span>{{ cotizacion.PRICE }}</span></p>
                        <p>Highest price of the day: <span>{{ cotizacion.HIGHDAY }}</span></p>
                        <p>Lowest price of the day: <span>{{ cotizacion.LOWDAY }}</span></p>
                        <p>Change in the last 24 hours: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
                        <p>Last update: <span>{{ cotizacion.LASTUPDATE }}</span></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
