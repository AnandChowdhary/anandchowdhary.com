# Custom-domain cutover — complete

Completed 2026-10-28: Cloudflare resolves to the four GitHub Pages IPs and www
resolves to anandchowdhary.github.io. The certificate is approved for both names,
HTTPS enforcement is enabled, and HTTP/www redirect to https://anandchowdhary.com/.
All 801 URLs, freshness smoke and browser interactions pass. See
[custom-domain-verification.json](custom-domain-verification.json) and the
custom-domain-*.txt evidence. Workflow 40753589613 is green.

The following records and staging notes are retained for reference.


The static Pages site passed published-route, browser and release performance
checks at its GitHub project URL. Pages now has `anandchowdhary.com` registered;
the root-path artifact is published and verified directly at GitHub’s origin.
See root-origin-preflight.json; this probe does not establish valid custom-domain
HTTPS, which remains pending DNS changes. Project Pages URLs
redirect to the configured custom domain after this registration.

Cloudflare is authoritative (anna.ns.cloudflare.com, jonah.ns.cloudflare.com),
but no DNS-management connection is available in this workspace. The owner must
make these changes in Cloudflare DNS:

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| CNAME | www | anandchowdhary.github.io | DNS only |

Replace old apex hosting records and conflicting www A/AAAA/CNAME records;
preserve unrelated MX/TXT and other subdomain records. No apex AAAA records were
observed in the preflight lookup. Use TTL Auto/300 seconds and keep a copy of the
previous hosting records. HTTPS provisioning on Pages must be checked after DNS
reaches GitHub; do not call the custom-domain cutover complete before that passes.

Before cutover, the public apex resolved to **216.198.79.1**, serving the original
Vercel Next.js deployment. Public DNS lookup evidence is in dns-before.json.
Vercel's original deployment `dpl_Hp4R8Z5uCBdUWdT1bdUPhnZCC14N` and its domain
mapping are retained. Restore the old hosting records if rollback is necessary.

The Pages workflow's final custom-domain smoke check can fail while DNS still
points to the old Vercel site: its build-info.json belongs to the new static
release and is not available on old Next.js. The root artifact must also be
probed directly at GitHub's origin before asking for the DNS switch. Once DNS
and HTTPS work, rerun the failed deploy verification and the full public checks.
