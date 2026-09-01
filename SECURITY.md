# Security Policy

The canonical disclosure policy and STRIDE threat model live in the documentation repo:

- [Disclosure policy](https://github.com/ichava/documentation/blob/main/SECURITY.md)
- [Threat model](https://github.com/ichava/documentation/blob/main/security-threat-model.md)
- [Operator-facing security model](https://github.com/ichava/documentation/blob/main/security-model.md)

## Reporting

Do not open a public GitHub issue for a security report. Two channels, in order of preference:

1. **GitHub private vulnerability reporting**, from this repository's Security tab.
2. **Email `security@simtabi.com`**, if you would rather not use GitHub.

Acknowledgement within 48 hours; patch SLA per severity in the canonical policy.

## Scope for this package

`@ichava/motion` runs in the browser and ships no runtime dependencies. The surface worth reporting
is animation configuration reaching the DOM from untrusted input, and the Lottie adapter, which
executes third-party animation data through a runtime the host supplies.
