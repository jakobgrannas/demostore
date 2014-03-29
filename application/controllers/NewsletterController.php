<?php

class NewsletterController extends Zend_Controller_Action {

	public function init() {
		/* Initialize action controller here */
	}

	public function indexAction() {
		// action body
	}

	public function subscribeAction() {
		$this->_helper->viewRenderer->setNoRender();
		$this->_helper->layout()->disableLayout();

		$params = $this->getRequest()->getParams();

		$email = $params['email'];
				
		$data = '';
		$errorMessage = '';
		
		if(!isset($email)) {
			$errorMessage = 'Missing required parameter [email]';
		}
		else if($this->validateEmail($email)) {
			$data = array(
				"message" => "You are now subscribed to our newsletter. Thank you!"
			);
		}
		else {
			$errorMessage = 'Please enter a valid email address';
		}

		
		$response = array(
			"data" => $data,
			"errorMessage" => $errorMessage
		);
		
		$this->_helper->json($response, true);
	}
	
	private function validateEmail($email) {
		$validator = new Zend_Validate_EmailAddress();
		return $validator->isValid($email);
	}

}
