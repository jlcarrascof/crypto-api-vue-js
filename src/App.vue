<script setup>
    import { ref, reactive } from 'vue'
    import Alerta from './components/Alerta.vue'
    import Spinner from './components/Spinner.vue'
    import Cotizacion from './components/Cotizacion.vue'
    import useCripto from './composables/useCripto'

    const { monedas, criptomonedas, cargando, cotizacion, obtenerCotizacion, mostrarResultado } = useCripto()

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

            <Spinner v-if="cargando" />

            <Cotizacion v-if="mostrarResultado" />

        </div>
    </div>
</template>
