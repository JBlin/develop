import { get } from '../service/request'
import { regexEmail, regexPassword } from '../regex'

describe('Http Module Service', () => {
  describe('Http Method test', () => {
    test('should response status code be 200 ', () => {
      get('/test/get').then((response) => {
        expect(response.status).toEqual(200)
      })
    })
  })

  describe('Regex test', () => {
    test('should regex by email is true ', () => {
      expect(regexEmail.test("rxgp1@hyper-link.kr")).toEqual(true) // 정규식 성공
      expect(regexEmail.test("rxgp1@hyper-link..cim")).toEqual(false) // 정규식 실패

      expect(regexPassword.test("qqqq1111!")).toEqual(true)       // 비밀번호 성공
      expect(regexPassword.test("dwdwdwdwdw")).toEqual(false)     // 비밀번호 실패
    })
  })
})
