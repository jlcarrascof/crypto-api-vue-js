<script setup>
    import { ref, onMounted } from 'vue'

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    const criptomonedas = ref([])

    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&limit=20';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(({Data}) => criptomonedas.value = Data)
    })
</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Cryptocurrency <span>Price Ticker</span></h1>

        <div class="contenido">

            <form class="formulario">
                <div class="campo">
                    <label for="moneda">Currency: </label>
                    <select id="moneda">
                        <option value="">-- Select --</option>
                        <option 
                            v-for="moneda in monedas" 
                            :value="moneda.codigo">
                                {{ moneda.texto }}
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label for="cripto">Currency: </label>
                    <select id="cripto">
                        <option value="">-- Select --</option>
                        <option 
                            v-for="criptomoneda in criptomonedas" 
                            :value="criptomoneda.CoinInfo.Name">
                                {{ criptomoneda.CoinInfo.FullName }}
                        </option>
                    </select>
                </div>

            </form>

            <input type="submit" value="Cotizar" />

        </div>
    </div>
</template>
