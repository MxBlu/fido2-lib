/// <reference types="node" />

declare module "fido2-lib" {
  class Fido2Lib {
    /**
     * Creates a FIDO2 server class
     * @param {Object} opts Options for the server
     * @param {Number} [opts.timeout=60000] The amount of time to wait, in milliseconds, before a call has timed out
     * @param {String} [opts.rpId="localhost"] The name of the server
     * @param {String} [opts.rpName="Anonymous Service"] The name of the server
     * @param {String} [opts.rpIcon] A URL for the service's icon. Can be a [RFC 2397]{@link https://tools.ietf.org/html/rfc2397} data URL.
     * @param {Number} [opts.challengeSize=64] The number of bytes to use for the challenge
     * @param {Object} [opts.authenticatorSelectionCriteria] An object describing what types of authenticators are allowed to register with the service.
     * See [AuthenticatorSelectionCriteria]{@link https://w3.org/TR/webauthn/#authenticatorSelection} in the WebAuthn spec for details.
     * @param {String} [opts.authenticatorAttachment] Indicates whether authenticators should be part of the OS ("platform"), or can be roaming authenticators ("cross-platform")
     * @param {Boolean} [opts.authenticatorRequireResidentKey] Indicates whether authenticators must store the key internally (true) or if they can use a KDF to generate keys
     * @param {String} [opts.authenticatorUserVerification] Indicates whether user verification should be performed. Options are "required", "preferred", or "discouraged".
     * @param {String} [opts.attestation="direct"] The preferred attestation type to be used.
     * See [AttestationConveyancePreference]{https://w3.org/TR/webauthn/#enumdef-attestationconveyancepreference} in the WebAuthn spec
     * @param {Array<Number>} [opts.cryptoParams] A list of COSE algorithm identifiers (e.g. -7)
     * ordered by the preference in which the authenticator should use them.
     */
    constructor(opts?: Fido2LibOptions);

    /**
     * Parses and validates an attestation response from the client
     * @param {Object} res The assertion result that was generated by the client.
     * See {@link https://w3.org/TR/webauthn/#authenticatorattestationresponse AuthenticatorAttestationResponse} in the WebAuthn spec.
     * @param {String|ArrayBuffer} [res.id] The id returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String|ArrayBuffer} [res.rawId] The encoded rawId returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string. If `res.rawId` is missing, `res.id` will be used instead. If both are missing an error will be thrown.
     * @param {String|ArrayBuffer} res.response.clientDataJSON The encoded clientDataJSON returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String|ArrayBuffer} res.response.authenticatorData The encoded authenticatorData returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {Object} expected The expected parameters for the assertion response.
     * If these parameters don't match the recieved values, validation will fail and an error will be thrown.
     * @param {String|ArrayBuffer} expected.challenge The challenge that was sent to the client, as generated by [assertionOptions]{@link Fido2Lib#assertionOptions}. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String} expected.origin The expected origin that the authenticator has signed over. For example, "https://localhost:8443" or "https://webauthn.org"
     * @param {String} expected.factor Which factor is expected for the assertion. Valid values are "first", "second", or "either".
     * If "first", this requires that the authenticator performed user verification (e.g. - biometric authentication, PIN authentication, etc.).
     * If "second", this requires that the authenticator performed user presence (e.g. - user pressed a button).
     * If "either", then either "first" or "second" is acceptable
     * @return {Promise<Fido2AttestationResult>} Returns a Promise that resolves to a {@link Fido2AttestationResult}
     * @throws {Error} If parsing or validation fails
     */
    attestationOptions(
      opts?: AttestationOptions
    ): Promise<PublicKeyCredentialCreationOptions>;
    /**
     * Parses and validates an assertion response from the client
     * @param {Object} res The assertion result that was generated by the client.
     * See {@link https://w3.org/TR/webauthn/#authenticatorassertionresponse AuthenticatorAssertionResponse} in the WebAuthn spec.
     * @param {String|ArrayBuffer} [res.id] The id returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String|ArrayBuffer} [res.rawId] The rawId returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string. If `res.rawId` is missing, `res.id` will be used instead. If both are missing an error will be thrown.
     * @param {String|ArrayBuffer} res.response.clientDataJSON The clientDataJSON returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String|ArrayBuffer} res.response.attestationObject The authenticatorData returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String|ArrayBuffer} res.response.signature The signature returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String|ArrayBuffer|null} [res.response.userHandle] The userHandle returned by the client. Data may be an ArrayBuffer, or a base64 or base64url encoded string. May be null or an empty string.
     * @param {Object} expected The expected parameters for the assertion response.
     * If these parameters don't match the recieved values, validation will fail and an error will be thrown.
     * @param {String|ArrayBuffer} expected.challenge The challenge that was sent to the client, as generated by [assertionOptions]{@link Fido2Lib#assertionOptions}. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @param {String} expected.origin The expected origin that the authenticator has signed over. For example, "https://localhost:8443" or "https://webauthn.org"
     * @param {String} expected.factor Which factor is expected for the assertion. Valid values are "first", "second", or "either".
     * If "first", this requires that the authenticator performed user verification (e.g. - biometric authentication, PIN authentication, etc.).
     * If "second", this requires that the authenticator performed user presence (e.g. - user pressed a button).
     * If "either", then either "first" or "second" is acceptable
     * @param {String} expected.publicKey A PEM encoded public key that will be used to validate the assertion response signature.
     * This is the public key that was returned for this user during [attestationResult]{@link Fido2Lib#attestationResult}
     * @param {Number} expected.prevCounter The previous value of the signature counter for this authenticator.
     * @param {String|ArrayBuffer|null} expected.userHandle The expected userHandle, which was the user.id during registration. Data may be an ArrayBuffer, or a base64 or base64url encoded string.
     * @return {Promise<Fido2AssertionResult>} Returns a Promise that resolves to a {@link Fido2AssertionResult}
     * @throws {Error} If parsing or validation fails
     */
    attestationResult(
      res: AttestationResult,
      expected: ExpectedAttestationResult
    ): Promise<Fido2AttestationResult>;
    /**
     * Gets a challenge and any other parameters for the `navigator.credentials.create()` call
     * The `challenge` property is an `ArrayBuffer` and will need to be encoded to be transmitted to the client.
     * @param {Object} [opts] An object containing various options for the option creation
     * @param {Object} [opts.extensionOptions] An object that contains the extensions to enable, and the options to use for each of them.
     * The keys of this object are the names of the extensions (e.g. - "appid"), and the value of each key is the option that will
     * be passed to that extension when it is generating the value to send to the client. This object overrides the extensions that
     * have been set with {@link enableExtension} and the options that have been set with {@link setExtensionOptions}. If an extension
    * was enabled with {@link enableExtension} but it isn't included in this object, the extension won't be sent to the client. Likewise,
    * if an extension was disabled with {@link disableExtension} but it is included in this object, it will be sent to the client.
    * @param {String} [extraData] Extra data to be signed by the authenticator during attestation. The challenge will be a hash:
    * SHA256(rawChallenge + extraData) and the `rawChallenge` will be returned as part of PublicKeyCredentialCreationOptions.
    * @returns {Promise<PublicKeyCredentialCreationOptions>} The options for creating calling `navigator.credentials.create()`
    */
    assertionOptions(
      opts?: AssertionOptions
    ): Promise<PublicKeyCredentialRequestOptions>;
    /**
     * Creates an assertion challenge and any other parameters for the `navigator.credentials.get()` call.
     * The `challenge` property is an `ArrayBuffer` and will need to be encoded to be transmitted to the client.
     * @param {Object} [opts] An object containing various options for the option creation
     * @param {Object} [opts.extensionOptions] An object that contains the extensions to enable, and the options to use for each of them.
     * The keys of this object are the names of the extensions (e.g. - "appid"), and the value of each key is the option that will
     * be passed to that extension when it is generating the value to send to the client. This object overrides the extensions that
     * have been set with {@link enableExtension} and the options that have been set with {@link setExtensionOptions}. If an extension
     * was enabled with {@link enableExtension} but it isn't included in this object, the extension won't be sent to the client. Likewise,
     * if an extension was disabled with {@link disableExtension} but it is included in this object, it will be sent to the client.
     * @param {String} [extraData] Extra data to be signed by the authenticator during attestation. The challenge will be a hash:
     * SHA256(rawChallenge + extraData) and the `rawChallenge` will be returned as part of PublicKeyCredentialCreationOptions.
     * @returns {Promise<PublicKeyCredentialRequestOptions>} The options to be passed to `navigator.credentials.get()`
     */
    assertionResult(
      res: AssertionResult,
      expected: ExpectedAssertionResult
    ): Promise<Fido2AssertionResult>;
  }

  interface Fido2LibOptions {
    timeout?: number;
    rpId?: string;
    rpName?: string;
    rpIcon?: string;
    challengeSize?: number;
    authenticatorAttachment?: Attachment;
    authenticatorRequireResidentKey?: boolean;
    authenticatorUserVerification?: UserVerification;
    attestation?: Attestation;
    cryptoParams?: Array<number>;
  }

  interface AuthenticatorSelectionCriteria {
    attachment?: Attachment;
    requireResidentKey?: boolean;
    userVerification?: UserVerification;
  }

  interface AttestationOptions {
    extensionOptions?: any;
    extraData?: string;
  }

  interface AssertionOptions {
    extensionOptions?: any;
    extraData?: string;
  }

  interface PublicKeyCredentialCreationOptions {
    rp: { name: string; id: string; icon?: string };
    user: { id: string, name: string, displayName: string };
    challenge: ArrayBuffer;
    pubKeyCredParams: Array<{ type: "public-key"; alg: number }>;
    timeout?: number;
    attestation?: Attestation;
    authenticatorSelectionCriteria?: AuthenticatorSelectionCriteria;
    rawChallenge?: ArrayBuffer;
    extensions?: any;
  }

  type Attestation = "direct" | "indirect" | "none";
  type Attachment = "platform" | "cross-platform";
  type UserVerification = "required" | "preferred" | "discouraged";
  type Factor = "first" | "second" | "either";

  interface AttestationResult {
    id?: string | ArrayBuffer;
    rawId?: string | ArrayBuffer;
    transports?: string[];
    response: { clientDataJSON: string | ArrayBuffer; attestationObject: string | ArrayBuffer };
  }

  interface ExpectedAttestationResult {
    rpId?: string;
    origin: string;
    challenge: string | ArrayBuffer;
    factor: Factor;
  }

  interface Fido2AttestationResult {
    authnrData: Map<string, any>;
    clientData: Map<string, any>;
    expectations: Map<string, string>;
    request: AttestationResult;
    audit: Audit;
  }

  interface Audit {
    validExpectations: boolean;
    validRequest: boolean;
    complete: boolean;
    journal: Set<string>;
    warning: Map<string, string>;
    info: Map<string, string>;
  }

  interface PublicKeyCredentialRequestOptions {
    challenge: ArrayBuffer;
    timeout?: number;
    rpId?: string;
    attestation?: Attestation;
    userVerification?: UserVerification;
    rawChallenge?: ArrayBuffer;
    extensions?: any;
    allowCredentials?: PublicKeyCredentialDescriptor[];
  }

  interface PublicKeyCredentialDescriptor {
    type: "public-key";
    id: string | ArrayBuffer;
    transports?: string[];
  }

  interface AssertionResult {
    id?: string | ArrayBuffer;
    rawId?: string | ArrayBuffer;
    response: {
      clientDataJSON: string | ArrayBuffer;
      authenticatorData: string | ArrayBuffer;
      signature: string | ArrayBuffer;
      userHandle?: string | ArrayBuffer;
    };
  }

  interface ExpectedAssertionResult {
    rpId?: string;
    challenge: string | ArrayBuffer;
    origin: string;
    factor: Factor;
    publicKey: string;
    prevCounter: number;
    userHandle: string | ArrayBuffer | null;
    allowCredentials?: PublicKeyCredentialDescriptor[];
  }

  interface Fido2AssertionResult {
    authnrData: Map<string, any>;
    clientData: Map<string, any>;
    expectations: Map<string, string>;
    request: AttestationResult;
    audit: Audit;
  }
}
