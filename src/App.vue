<script setup>
    import { ref } from 'vue'

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Cryptocurrency <span>Price Ticker</span></h1>

        <div class="contenido">
            <div class="campo">
                <label for="moneda">Currency: </label>
                <select id="moneda">
                    <option value="">-- Select --</option>
                    <option v-for="moneda in monedas" value="">{{ moneda.texto }}</option>
                </select>
            </div>
        </div>
    </div>
</template>
