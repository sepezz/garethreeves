const SOURCE_URL = "https://garethareeves.substack.com/archive";

exports.handler = async () => {
  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
        body: "Unable to load the Substack archive.",
      };
    }

    const body = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
      body,
    };
  } catch (error) {
    console.error("Substack archive proxy failed", error);

    return {
      statusCode: 502,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
      body: "Unable to connect to the Substack archive.",
    };
  }
};
