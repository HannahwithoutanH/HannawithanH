const request = require("supertest");
const server = require("../server.js");


describe("Routes",()=>{
  describe("/venues",()=>{
    it("should should return JSON", ()=>{});

    it("returns a list of venues", () =>{});
  })

  describe("/login", ()=>{
    it("calls passport",()=>{});
    it("redirects to a dashboard upon logging in", ()=>{})
  })
})