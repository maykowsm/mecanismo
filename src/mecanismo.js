class Mecanismo {
    constructor() {}

    calc(dimencoes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ang = 0) {
        const [a, b, c, d, e, f, g, h, i, j, x, y, m] = dimencoes;

        try {
            this.ang = (ang * Math.PI) / 180;

            // Equações secundárias
            this.yAng = Math.atan(y / x);
            this.mAng = Math.PI - this.ang + this.yAng;
            this.kLinha = Math.sqrt(x ** 2 + y ** 2);
            this.iLinha = this.ladoCossenos(this.kLinha, m, this.mAng);
            this.iAng = Math.acos((a ** 2 + b ** 2 - this.kLinha ** 2 - m ** 2 + 2 * this.kLinha * m * Math.cos(this.mAng)) / (2 * a * b));
            this.mLinhaAng = Math.asin((m * Math.sin(this.mAng)) / this.iLinha);
            this.bAng = this.angCossenos(b, a, this.iLinha);
            this.cAng = this.angCossenos(c, a, d);
            this.jAng = this.angCossenos(j, this.iLinha, f);
            this.wLinhaAng = 2 * Math.PI - this.cAng - this.bAng - this.jAng;
            this.wLinha = this.ladoCossenos(d, f, this.wLinhaAng);
            this.dAng = this.angCossenos(d, this.wLinha, f);
            this.eAng = this.angCossenos(e, this.wLinha, h);
            this.gAng = this.angCossenos(g, h, i);
            this.gLinhaAng = this.jAng - this.mLinhaAng - this.yAng - this.eAng - this.dAng;

            // Calculo das coordenadas de cada ponto
            this.p0 = [x, y];
            this.p1 = [m * Math.cos(this.ang) + x, m * Math.sin(this.ang) + y];
            this.p2 = [a * Math.cos(this.bAng + this.mLinhaAng + this.yAng), a * Math.sin(this.bAng + this.mLinhaAng + this.yAng)];
            this.p3 = [0, 0];
            this.p4 = [d * Math.cos(this.cAng + this.bAng + this.mLinhaAng + this.yAng), d * Math.sin(this.cAng + this.bAng + this.mLinhaAng + this.yAng)];
            this.p5 = [
                h * Math.cos(Math.PI - this.gLinhaAng) + f * Math.cos(2 * Math.PI - (this.jAng - this.mLinhaAng - this.yAng)),
                h * Math.sin(Math.PI - this.gLinhaAng) + f * Math.sin(2 * Math.PI - (this.jAng - this.mLinhaAng - this.yAng))
            ];
            this.p6 = [
                f * Math.cos(2 * Math.PI - (this.jAng - this.mLinhaAng - this.yAng)),
                f * Math.sin(2 * Math.PI - (this.jAng - this.mLinhaAng - this.yAng))
            ];
            this.p7 = [
                i * Math.cos(Math.PI + (this.gAng - this.gLinhaAng)) + f * Math.cos(2 * Math.PI - (this.jAng - this.mLinhaAng - this.yAng)),
                i * Math.sin(Math.PI + (this.gAng - this.gLinhaAng)) + f * Math.sin(2 * Math.PI - (this.jAng - this.mLinhaAng - this.yAng))
            ];

            return {p0: this.p0,
                    p1: this.p1,
                    p2: this.p2,
                    p3: this.p3,
                    p4: this.p4,
                    p5: this.p5,
                    p6: this.p6,
                    p7: this.p7};
        } catch (error) {
            return false;
        }
    }

    getBar(){
        return {
            a: {v1: this.p2, v2: this.p3},
            b: {v1: this.p1, v2: this.p2},
            c: {v1: this.p2, v2: this.p4},
            d: {v1: this.p3, v2: this.p4},
            e: {v1: this.p4, v2: this.p5},
            f: {v1: this.p3, v2: this.p6},
            g: {v1: this.p5, v2: this.p7},
            h: {v1: this.p5, v2: this.p6},
            i: {v1: this.p6, v2: this.p7},
            j: {v1: this.p1, v2: this.p6},
            m: {v1: this.p0, v2: this.p1},
        }
    }

    // Retorna o lado de um triangulo sendo ang o angulo oposto ao lado que se quer obter, a e b os lados adjacentes
    ladoCossenos(a, b, ang) {
        return Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(ang));
    }

    // Retorna o angulo pela lei dos cossenos, sendo "a" o lado do triangulo oposto ao angulo que se quer encontrar
    angCossenos(a, b, c) {
        return Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
    }

    retorna() {
        return [this.iLinha, this.iAng, this.mLinhaAng, this.bAng];
    }
}

// Exemplo de uso:
// const perna = new Perna();
// const dim = [41.5, 50, 55.8, 40.1, 39.4, 39.3, 65.7, 36.7, 49, 61.9, 38, 7.8, 15];
// const res = perna.calc(dim, 0);
// console.log(res);
