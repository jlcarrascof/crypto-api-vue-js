<template>
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
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>