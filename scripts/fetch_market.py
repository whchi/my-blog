from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import yfinance as yf


CONTENT_PATH = Path("content/tools/vix-wit-dxy.mdx")
SYMBOLS = {
    "vix": "^VIX",
    "wti": "CL=F",
    "dxy": "DX-Y.NYB",
}


def fetch_daily_change(symbol: str) -> float:
    history = yf.Ticker(symbol).history(period="7d", interval="1d", auto_adjust=False)
    close_series = history["Close"].dropna()
    if len(close_series) < 2:
        raise RuntimeError(f"Not enough price history for {symbol}")

    latest_close = float(close_series.iloc[-1])
    previous_close = float(close_series.iloc[-2])
    change = ((latest_close - previous_close) / previous_close) * 100
    return round(change, 1)


def render_market_defaults(vix: float, wti: float, dxy: float, updated_at: str) -> str:
    return (
        "market_defaults:\n"
        f"  vix: {vix:.1f}\n"
        f"  wti: {wti:.1f}\n"
        f"  dxy: {dxy:.1f}\n"
        f"  updated_at: '{updated_at}'"
    )


def update_content_file(content: str, market_block: str) -> str:
    pattern = re.compile(
        r"market_defaults:\n"
        r"  vix: .*\n"
        r"  wti: .*\n"
        r"  dxy: .*\n"
        r"  updated_at: .*",
        re.MULTILINE,
    )
    if pattern.search(content):
        return pattern.sub(market_block, content, count=1)

    front_matter_end = content.find("---\n", 4)
    if front_matter_end == -1:
        raise RuntimeError("Unable to find front matter in content/tools/vix-wit-dxy.mdx")

    insert_at = front_matter_end
    return content[:insert_at] + market_block + "\n" + content[insert_at:]


def main() -> None:
    values = {key: fetch_daily_change(symbol) for key, symbol in SYMBOLS.items()}
    updated_at = datetime.now(ZoneInfo("Asia/Taipei")).strftime("%Y-%m-%d %H:%M %Z")

    content = CONTENT_PATH.read_text(encoding="utf-8")
    market_block = render_market_defaults(
        vix=values["vix"],
        wti=values["wti"],
        dxy=values["dxy"],
        updated_at=updated_at,
    )
    updated_content = update_content_file(content, market_block)
    CONTENT_PATH.write_text(updated_content, encoding="utf-8")

    print(f"Updated {CONTENT_PATH} with VIX={values['vix']:.1f}, WTI={values['wti']:.1f}, DXY={values['dxy']:.1f}")


if __name__ == "__main__":
    main()
