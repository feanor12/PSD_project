
export default {
    name:"App",
    template: `
        <div id="p1" width="400px" height="400px"></div>
    `,
    methods: {
        plot() {
            $.plot("#p1",[[0,0],[1,1]])
        }
    },
    mounted() {
        this.plot()
    }
}