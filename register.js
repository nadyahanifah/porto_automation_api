const request_url = require("supertest")("http://barru.pythonanywhere.com");
const assert = require("chai").expect;

describe("Test Register Feature", function () { // DEKLARASI FUNCTION YANG AKAN DI TES
  it("Verify Success Register", async function () { // TEST CASE
    let random_email = Math.random().toString(36).substring(7); // MEMBUAT RANDOM KATA

    const response = await request_url // INI BUAT NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: random_email, name: random_email }); // INI SESUAI BODY

    const hasil_response = response.body; // BERISI HASIL RESPONSE HASIL NEMBAK API, ADA DATA, MESSAGE, STATUS

    assert(response.body.status).to.eql('SUCCESS_REGISTER');
    assert(response.body.message).to.eql('created user!');
    assert(response.body.data).to.eql('berhasil');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("Failed Register with empty name and valid email, password", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "namasaya123", name: "" });
    const hasil_response = response.body;
    assert(response.statusCode).to.eql(420);
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.message).to.eql('Gagal Registrasi');
    assert(response.body.data).to.eql('bEmail/Username/Password tidak boleh kosong');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("Failed Register with registered email", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "namasaya123@gmail.com", password: "namasaya123", name: "nama saya siapa" });
    const hasil_response = response.body;
    assert(response.statusCode).to.eql(420);
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.message).to.eql('Gagal Registrasi');
    assert(response.body.data).to.eql('Email sudah terdaftar, gunakan Email lain');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("Failed Register with invalid email", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "gmail.com", password: "namasaya123", name: "" });
    const hasil_response = response.body;
    assert(response.statusCode).to.eql(420);
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.message).to.eql('Cek kembali email anda');
    assert(response.body.data).to.eql('Cek kembali email anda');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("Failed Register with invalid email or password", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "namasaya123?", name: "" });
    const hasil_response = response.body;
    assert(response.statusCode).to.eql(420);
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.message).to.eql('Tidak boleh mengandung symbol');
    assert(response.body.data).to.eql('Nama atau password tidak valid');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });
});