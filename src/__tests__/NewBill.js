import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { fireEvent, screen } from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import { localStorageMock } from "../__mocks__/localStorage.js"
import '@testing-library/jest-dom/extend-expect'
import { ROUTES, ROUTES_PATH } from '../constants/routes.js'
import firebase from "../__mocks__/firebase"
import firestore from "../app/Firestore.js"

//import BillsUI from "../views/BillsUI.js";

describe("Given I am connected as an employee an I am on a NewBill page", () => {
  describe("When I upload a proof file", () => {
    test("Then it should have been changed in the input", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({
        document, onNavigate, firestore: null, localStorage: window.localStorage
      })
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      const inputFile = screen.getByTestId("file")
      inputFile.addEventListener('change', handleChangeFile)
     
      fireEvent.change(inputFile, { 
        target: { 
          files: [new File(["myProof"], "myProof.png", {
            type: "image/png"
          })]   
        }
      }) 
      expect(handleChangeFile).toHaveBeenCalled();
      expect(inputFile.files[0].name).toBe("myProof.png");
    })    
  })

  describe("When I submit the form with a not valid proof file", () => {
    test("It should not submit the form and stay on NewBill page", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({
        document, onNavigate, firestore: null, localStorage: window.localStorage
      })
      const handleSubmit = jest.fn(newBill.handleSubmit)
      newBill.fileName = 'invalid'
      const newBillform = screen.getByTestId("form-new-bill")
      newBillform.addEventListener('submit', handleSubmit)
      fireEvent.submit(newBillform)
      expect(handleSubmit).toHaveBeenCalled()
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy() 
    })
  })

  describe("When I submit the form with an proof file", () => {
    test("It should create a new bill with a proof file", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({
        document, onNavigate, firestore: null, localStorage: window.localStorage
      })
      const handleSubmit = jest.fn(newBill.handleSubmit)
      const newBillform = screen.getByTestId("form-new-bill")
      newBillform.addEventListener('submit', handleSubmit)
      fireEvent.submit(newBillform)
      expect(handleSubmit).toHaveBeenCalled()
    })
  })

  /*
  describe("When I do not fill fields and I click on submit button", () => {
    test("Then it should not submit the form", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = NewBillUI()
      document.body.innerHTML = html

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({
        document, onNavigate, firestore : null, localStorage: window.localStorage
      })
      const inputDate = screen.getByTestId('datepicker').value
      const inputAmount = screen.getByTestId('amount').value
      const inputPct = screen.getByTestId('pct').value
      const inputFile = screen.getByTestId('file').value
      expect(inputDate).toBe("")
      expect(inputAmount).toBe("")
      expect(inputPct).toBe("")
      expect(inputFile).toBe("")

      const form = screen.getByTestId("form-new-bill")
      const handleSubmit = jest.fn(e => e.preventDefault())  
      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form) 
      expect(form).toBeTruthy() 
    })
  })

  describe("When I fill fields and I click on submit button", () => {
    test("Then required fields should be filled", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = NewBillUI()
      document.body.innerHTML = html

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const inputDate = screen.getByTestId('datepicker')
      const inputAmount = screen.getByTestId('amount')
      const inputPct = screen.getByTestId('pct')
      const inputFile = screen.getByTestId('file')

      fireEvent.change(inputDate, { target: { value: '2021-05-20'}})
      fireEvent.change(inputAmount, { target: { value: "80" } })      
      fireEvent.change(inputPct, { target: { value: "20" } }) 
      fireEvent.change(inputFile, { target: { files: ["../assets/images/avataaars_Girl2.png","avataaars_Girl2.png"]}})  
      
      expect(inputDate.value).not.toBe("")
      expect(inputAmount.value).not.toBe("")
      expect(inputPct.value).not.toBe("")
      expect(inputFile.files[0]).not.toBe("")
      const firestore = null
      const newBill = new NewBill({
        document, onNavigate, firestore, localStorage: window.localStorage
      })
      
      const handleSubmit = jest.fn(newBill.handleSubmit)
      const form = screen.getByTestId('form-new-bill')
      form.addEventListener('submit', handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()          
    })
  })*/
})