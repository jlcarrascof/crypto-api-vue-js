export default function useCripto() {
    const cotizarMoneda = () => {
        console.log('Cotizando desde useCripto()')
    }

    const auth = false

    return {
        cotizarMoneda,
        auth
    }
}