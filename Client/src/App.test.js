import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// unit test for login page 
describe("login describe statement", ()=> {
  test("validate function should pass on correct input", ()=> {
    const text = "text";
    expect(validateInput(text)).toBe(true);
  });
  
  test("validate function should fail on incorrect input", ()=> {
    const text = "text";
    expect(validateInput(text)).not.toBe(true);
  });
  
  test("login form should be in the document", ()=> {
    const component = render(<App />);
    const labelNode = component.getByText("username");
    expect(inputNode).toBeInTheDocument();
  });

  test("username field should have label", ()=> {
    const component = render(<App />);
    const userNameInputNode = component.getByLabelText("username");
    expect(userNameInputNode.getAttribute("name")).toBe("username");
  });

  test("username input should accept text", ()=> {
    const {getByLabelText} = render(<App />);
    const NameInputNode = getByLabelText("username");
    expect(userNameInputNode.value).toMatch("");
    fireEvent.change(userNameInputNode, {target: {value: "testing"}});
    expect(userNameInputNode.value).toMatch("testing");
  
    const errorMessageNode = getByText("username not valid");
    expect(errorMessageNode).toBeInTheDocument();

    fireEvent.change(userNameInputNode, {target: {value: "testing@"}});

    expect(errorMessageNode).not.toBeInTheDocument();
  }); 
  test("should be able to submit form", ()=> {
    const mockFN = jest.fn();
    const {getByRole} = render(<App handleSubmit={mockFn}/>);
    const buttonNode = getByRole("button");
    fireEvent.submit(buttonNode);
    expect(mockFn).toHaveBeenCalledTimes();
  })
});

//unit test for register page

var assert = require('assert');

suite('Register form', function() {

  test('validations', function(done) {
    this.timeout(5000);

    var jsdom = require("jsdom");
    jsdom.env({
      html: '',
      scripts: [
        __dirname + '/../vendor/angular.min.js',
        __dirname + 'TriviaKing/Client/src/Components/Pages/Register.js'
      ],
      features: {
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"],
      },
      done: function(errors, window) {
        if(errors != null) console.log('Errors', errors);

        var $ = function(selector) {
          return window.document.querySelector(selector);
        }

        var trigger = function(el, ev) {
          var e = window.document.createEvent('UIEvents');
          e.initEvent(ev, true, true);
          el.dispatchEvent(e);
        }

        var Controller = function($scope) {
          var runTests = function() {

            var register = $('#register-button');
            var message = $('#message');
            var username = $('#username');
            var password = $('#password');

            register.click();
            assert.equal(message.innerHTML, 'Missing username.');

            username.value = 'test';
            trigger(username, 'change');
            register.click();
            assert.equal(message.innerHTML, 'Missing password.');

            password.value = 'test';
            trigger(password, 'change');
            register.click();
            assert.equal(message.innerHTML, 'Too short username.');

            username.value = 'testtesttesttest';
            trigger(username, 'change');
            register.click();
            assert.equal(message.innerHTML, 'Too short password.');

            password.value = 'testtesttesttest';
            trigger(password, 'change');
            register.click();
            assert.equal(message.innerHTML, '');

            done();

          };
          setTimeout(runTests, 1000);
        }

        window
          .angular
          .module('app', [])
          .controller('Controller', Controller)
          .directive('registerForm', window.registerFormDirective);

      }
    });

  });

});


