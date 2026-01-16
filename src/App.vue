<script setup>
    import { ref, reactive, computed } from 'vue'
    import Alerta from './components/Alerta.vue'
    import Spinner from './components/Spinner.vue'
    import useCripto from './composables/useCripto'

    const { monedas, criptomonedas, cargando, cotizacion, obtenerCotizacion } = useCripto()

    const error = ref('')
    const cotizar = reactive({
        moneda: '',
        criptomoneda: '',
    })

    const cotizarCripto = () => {
        // Checking that cotizar is full
        if (Object.values(cotizar).includes('')) {
            error.value = 'All fields are mandatory...'
            return
        }
        error.value = ''

        obtenerCotizacion(cotizar)
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
