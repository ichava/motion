# Security Policy

The canonical disclosure policy and STRIDE threat model live in the documentation repo:

- [Disclosure policy](https://github.com/ichava/documentation/blob/main/SECURITY.md)
- [Threat model](https://github.com/ichava/documentation/blob/main/security-threat-model.md)
- [Operator-facing security model](https://github.com/ichava/documentation/blob/main/security-model.md)

## Reporting

Do not open a public GitHub issue. Use the address in the [canonical policy](https://github.com/ichava/documentation/blob/main/SECURITY.md); acknowledgement within 48 hours, patch SLA per severity.

## Scope for this package

`@ichava/motion` runs in the browser and ships no runtime dependencies. The surface worth reporting
is animation configuration reaching the DOM from untrusted input, and the Lottie adapter, which
executes third-party animation data through a runtime the host supplies.
