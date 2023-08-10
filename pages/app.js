
        <Container>
        <Head>
        <title>Quantum Leap Entanglement Fund (QEF)</title>
        {Meta(post)}
        </Head>
        <SingleColumn>
        <Header search={search} />
        <Section>

        <h1 className="pb-16">Quantum Leap Entanglement Fund (QEF)</h1>

        <div className="">
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, }}>
        <ConnectButton />
        </div>
        <div className="flex flex-col items-center">
        {isConnected && (
            <button
            class="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg"
            onClick={() => mint?.()}>
            Mint
            </button>
        )}
        </div>
        </div>

        </Section>

        </SingleColumn>
        <Footer />
        </Container>
