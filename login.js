const request_url = require("supertest")("http://barru.pythonanywhere.com"); // URL NGARAH KESINI
const validasi = require("chai").expect;

describe("Test Login Feature", function () { // TEST SCENARIO
  it("Verify succes login with data valid", async function () { // TEST CASE
    const response = await request_url // INI NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") 
      .send({ email: "mawardanmelati@gmail.com", password: "mawardanmelati123" });

    const isi_body = response.body;

    validasi(response.body.status).to.eql('SUCCESS_LOGIN');
    validasi(response.body.message).to.eql('Anda Berhasil Login');
    validasi(isi_body).to.include.keys("data", "message", "status", "credentials"); 
  });

  it("Failed Login with empty email & password", async function () { // TEST CASE
    const response = await request_url // INI NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") 
      .send({ email: "", password: "" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });

  it("Failed Login with email valid & empty password", async function () { // TEST CASE
    const response = await request_url // INI NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") 
      .send({ email: "mawardanmelati@gmail.com", password: "" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });

  it("Failed Login with email & password are not registered or invalid", async function () { // TEST CASE
    const response = await request_url // INI NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") 
      .send({ email: "mawardanmelati123@gmail.com", password: "123" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });

  it("Failed Login with valid email & invalid password", async function () { // TEST CASE
    const response = await request_url // INI NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") 
      .send({ email: "mawardanmelati@gmail.com", password: "123" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });
});