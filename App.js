
export default {
    name:"App",
    template: `
        <div id="p1" style="width:400px;height:300px"></div>
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