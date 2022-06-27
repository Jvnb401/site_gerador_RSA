const primeNumbers = document.getElementById("primeNumbers");
const test = document.getElementById('messagen');
let c = 0;
let n = 0;
let d = 0;
let arrNum = [];

const IsItPrime = (n) => {
    if (n % 2 == 0 && n != 2) {
        return "";
    }
    for (let j = 3; j <= Math.sqrt(n); j += 2) {
        if (n % j == 0) {
            return "";
        }
    }
    return n;
}

function PrintPrime(x) {
    const prime = IsItPrime(x);
    if (prime != null) {
        primeNumbers.innerHTML += `
                <option>${prime}</option>
            `;
    }
}

function MDC(a, b) {
    while (b != 0) {
        const r = a % b;
        a = b;
        b = r;
    }
    return a;
}

for (let i = 3; i < 1000; i += 2) {
    PrintPrime(i);
}

function Start() {
    let p = IsItPrime(document.getElementById("p").value);
    if (p == "") {
        alert("digite um numero primo no p");
        return
    }

    let q = IsItPrime(document.getElementById("q").value);
    if (q == "") {
        alert("digite um numero primo no q");
        return
    }

    n = p * q;
    let phiN = (p - 1) * (q - 1);
    document.getElementById("modN").value = n;
    document.getElementById("n").value = phiN;

    c = document.getElementById("c").value;
    if (!(1 < c && c < phiN && MDC(phiN, c) == 1)) {
        alert(`a chave publica deve atender aos requisitos:
        mdc(φ(n), e) = 1 e 1 < E < φ(n)
        obs: no caso φ(n) é ${phiN}`);
        return
    }

    while ((d * c) % phiN != 1) { d++ }
    document.getElementById('d').value = d;


    test.classList.remove('hide');

    c = BigInt(c);
    d = BigInt(d);
    n = BigInt(n);
}

function decipher() {
    let raw = document.getElementById("rawData");
    let encrypted = document.getElementById("encryptedData").value;
    encrypted = encrypted.replace(/\s/gi, "");
    raw.value = "";

    for (let i = 0; i < encrypted.length; i += 3) {
        const num = encrypted[i] + encrypted[i + 1] + encrypted[i + 2];
        arrNum.push(BigInt(parseInt(num)));
    }

    arrNum.map((x) => {
        x = (x ** d) % n;
        raw.value += x;
    });

    arrNum.splice(0, arrNum.length);
}

function encrypt() {
    let raw = document.getElementById("rawData").value;
    let encrypted = document.getElementById("encryptedData");
    raw = raw.replace(/\s/gi, "");
    encrypted.value = "";

    for (let i = 0; i < raw.length; i += 3) {
        const num = raw[i] + raw[i + 1] + raw[i + 2];
        arrNum.push(BigInt(parseInt(num)));
    }

    arrNum.map((x) => {
        x = (x ** c) % n;
        encrypted.value += x;
    });

    arrNum.splice(0, arrNum.length);
}