import { ref, onMounted } from 'vue'

export default function useCripto() {

    const criptomonedas = ref([])

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    const cotizacion = ref({})
    const cargando = ref(false)


    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&limit=20';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(({Data}) => criptomonedas.value = Data)
    })

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

    return {
        monedas,
        criptomonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
    }
}