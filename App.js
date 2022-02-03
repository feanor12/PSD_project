
export default {
    name:"App",
    template: `
        <div id="p1">test</div>
    `,
    methods: {
        plot() {
            $.plot("#p1",[])
        }
    },
    mounted() {
        this.plot()
    }
}