
export default {
    name: "App",
    template: `
        <div id ="inputs">
        <form id="parameter-form">
        <fieldset>
            <p>
                <label>$N_D [1/cm^3]$</label>
                <input v-model.number="ND" type="number" @change="update">
            </p>
            <p>
                <label>$N_A [1/cm^3]$</label>
                <input v-model.number="NA" type="number" @change="update">
            </p>
        </fieldset>
        <fieldset>
            <p><label>$\\epsilon [\\epsilon_0]$</label> <input type="number" v-model.number="epsilon" @change="update"></p>
            <p><label>$N_c(300) [1/cm^3]$</label> <input type="number" v-model.number="Nc300" @change="update"></p>
            <p><label>$N_v(300) [1/cm^3]$</label> <input type="number" v-model.number="Nv300" @change="update"></p>
            <p><label>$E_g [eV]$</label> <input type="number"  v-model.number="Eg" @change="update"></p>
        </fieldset>
        <fieldset>
            <p><label>$T [K]$</label> <input type="number" v-model.number="T" @change="update"></p>
            <p><label>$V_{min} [V]$</label> <input type="number" v-model.number="Vmin" @change="update"></p>
        </fieldset>
        <p><button type="button" >Replot</button></p>
    </form>
        </div>
        <div id="plots">
            <div id="plot_Cj" style="width:400px;height:300px"></div>
        </div>
  `,
    data: function () {
        return {
            plt_data: [],
            Vmin: -2,
            Eg: 1.12,
            Nc300: 2.78E19,
            Nv300: 9.84E18,
            NA: 1e15,
            ND: 1e15,
            epsilon: 12,
            T: 300,
            n: 200
        }
    },
    computed:{
        NA: {
            get: function(){
                this.NA.toExponential()
            }
        }
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

            for (let k = 0; k < this.n; k++) {
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
        },
        update(){
            this.calc_Cj()
            this.plot()
        }
    },
    mounted() {
        this.update()
    }
}