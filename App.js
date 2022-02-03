
export default {
    name: "App",
    template: `
        <div id="plots">
            <div id="plot_Cj" style="width:400px;height:300px"></div>
         </div>
  `,
    data: {
        plt_data =[],
        Vmin = -2,
        Eg = 1.13,
        Nc300 = 1,
        Nv300 = 1,
        NA = 1e13,
        ND = 1e13,
        epsilon = 12,
        T = 300,
        n = 200
    },
    methods: {
        calc_Cj() {
            var kb = 1.380658E-23;
            var qe = 1.602176565E-19;
            var epsilon_vac = 8.8541878128e-12;
            var NA = this.NA * 1e6
            var ND = this.ND * 1e6
            var epsilon = this.epsilon * epsilon_vac
            var Vmin = this.Vmin
            var T = this.T
            var Nc300 = this.Nc300 * 1e6
            var Nv300 = this.Nv300 * 1e6
            var Eg = this.Eg * qe
            var VBI = (Eg - kb * T * Math.log(Nc300 * Nv300 * Math.pow((T / 300), 3) / (NA * ND))) / qe

            this.plt_data.length = 0

            for (k = 0; k < this.n; k++) {
                var V = k * (VBI - Vmin) / (this.n - 1) + Vmin
                var W = Math.sqrt(epsilon * 2 * (NA + ND) * (VBI - V) / (qe * ND * NA))
                var Cj = epsilon / W
                this.plt_data[k + 1] = [V, 1 / Math.pow(Cj * 1e5, 2)]
            }
        },
        plot() {
            
            var data = [
                {
                    data: this.plt_data,
                    color: "black",
                    lines: { show: true, linewidth: 2 },
                    label: "Cⱼ"
                }]

            $.plot("#plot_Cj", data,
                {
                    yaxis: {
                        position: 'left',
                        axisLabel: "A²/C² [cm⁴/nF²]",
                        show: true,
                        mode: "linear"
                    },
                    xaxis: {
                        position: 'bottom',
                        axisLabel: 'V [V]',
                        showTicks: 'none',
                        show: true
                    },
                    legend: {
                        position: "ne",
                        show: true
                    }
                })
        }
    },
    mounted() {
        this.calc_Cj()
        this.plot()
    }
}