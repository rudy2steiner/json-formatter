'use client'

import { useEffect, useMemo, useState } from 'react';
import { FiRepeat } from 'react-icons/fi';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import HeadInfo from '~/components/HeadInfo';
import { Container } from './styles';

type EpochUnit = 'auto' | 's' | 'ms' | 'us' | 'ns';

const formatLocal = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
};

const detectUnit = (raw: string): Exclude<EpochUnit, 'auto'> => {
  const digits = raw.replace('-', '').length;
  if (digits >= 19) return 'ns';
  if (digits >= 16) return 'us';
  if (digits >= 13) return 'ms';
  return 's';
};

const toMillis = (value: string, unit: EpochUnit): number | null => {
  const num = Number(value.trim());
  if (!Number.isFinite(num)) return null;

  const resolvedUnit = unit === 'auto' ? detectUnit(value.trim()) : unit;

  if (resolvedUnit === 's') return num * 1000;
  if (resolvedUnit === 'ms') return num;
  if (resolvedUnit === 'us') return num / 1000;
  return num / 1_000_000;
};

const toDateTimeLocalValue = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const PageComponent = ({
  locale = '',
  timestampLanguageText,
  footerLanguageText,
  indexLanguageText,
}) => {
  const now = new Date();
  const [timestampInput, setTimestampInput] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<EpochUnit>('auto');
  const [dateInput, setDateInput] = useState(() => toDateTimeLocalValue(now));

  const timestampConversion = useMemo(() => {
    const ms = toMillis(timestampInput, unit);
    if (ms === null) {
      return {
        isValid: false,
        local: '',
        utc: '',
        seconds: '',
        milliseconds: '',
        microseconds: '',
        nanoseconds: '',
      };
    }

    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) {
      return {
        isValid: false,
        local: '',
        utc: '',
        seconds: '',
        milliseconds: '',
        microseconds: '',
        nanoseconds: '',
      };
    }

    return {
      isValid: true,
      local: formatLocal(date),
      utc: date.toUTCString(),
      seconds: String(Math.floor(ms / 1000)),
      milliseconds: String(Math.floor(ms)),
      microseconds: String(Math.floor(ms * 1000)),
      nanoseconds: String(Math.floor(ms * 1_000_000)),
    };
  }, [timestampInput, unit]);

  const dateToTimestamp = useMemo(() => {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;

    const ms = date.getTime();
    return {
      seconds: String(Math.floor(ms / 1000)),
      milliseconds: String(ms),
      microseconds: String(ms * 1000),
      nanoseconds: String(ms * 1_000_000),
    };
  }, [dateInput]);

  const [currentEpoch, setCurrentEpoch] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <HeadInfo
        title={timestampLanguageText.title}
        description={timestampLanguageText.description}
        keywords={timestampLanguageText.keywords}
        locale={locale}
        page={'/timestamp'}
      />
      <Header locale={locale} page={'timestamp'} indexLanguageText={indexLanguageText} />
      <Container>
        <header className="mt-10">
          <FiRepeat size={40} color="#F97316" />
          <div>
            <h1>{timestampLanguageText.h1}</h1>
            <h2 className="text-xs">{timestampLanguageText.h2_1}</h2>
          </div>
        </header>

        <div className="w-full max-w-3xl px-4 pb-12">
          <section className="py-6">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight">{timestampLanguageText.section_timestamp_to_date}</h3>
              <div className="text-right text-xs leading-5 opacity-70">
                <div>
                  {timestampLanguageText.current_unix_epoch}: <span className="tabular-nums font-semibold">{currentEpoch}</span>
                </div>
                <div>{timestampLanguageText.units_hint}</div>
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-3 md:flex-row">
              <input
                id="timestamp"
                name="timestamp"
                className="w-full rounded border border-orange-300 bg-white px-3 py-2 text-black shadow-sm"
                placeholder={timestampLanguageText.enter_timestamp_placeholder}
                value={timestampInput}
                onChange={(event) => setTimestampInput(event.target.value)}
              />
              <select
                id="timestamp_unit"
                name="timestamp_unit"
                className="rounded border border-orange-300 bg-white px-3 py-2 text-black shadow-sm"
                value={unit}
                onChange={(event) => setUnit(event.target.value as EpochUnit)}
              >
                <option value="auto">{timestampLanguageText.unit_auto}</option>
                <option value="s">{timestampLanguageText.unit_seconds}</option>
                <option value="ms">{timestampLanguageText.unit_milliseconds}</option>
                <option value="us">{timestampLanguageText.unit_microseconds}</option>
                <option value="ns">{timestampLanguageText.unit_nanoseconds}</option>
              </select>
            </div>

            {timestampConversion.isValid ? (
              <div className="grid gap-x-8 gap-y-2 text-sm md:grid-cols-2">
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_local}</span><span className="tabular-nums">{timestampConversion.local}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_utc}</span><span className="tabular-nums">{timestampConversion.utc}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_seconds}</span><span className="tabular-nums">{timestampConversion.seconds}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_millis}</span><span className="tabular-nums">{timestampConversion.milliseconds}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_micros}</span><span className="tabular-nums">{timestampConversion.microseconds}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_nanos}</span><span className="tabular-nums">{timestampConversion.nanoseconds}</span></div>
              </div>
            ) : (
              <p className="text-sm text-red-500">{timestampLanguageText.invalid_timestamp}</p>
            )}
          </section>

          <div className="border-t border-orange-200/60" />

          <section className="py-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold tracking-tight">{timestampLanguageText.h2_2}</h3>
              <p className="mt-1 text-sm opacity-80">{timestampLanguageText.pick_date}</p>
            </div>
            <input
              type="datetime-local"
              className="mb-4 w-full rounded border border-orange-300 bg-white px-3 py-2 text-black shadow-sm"
              value={dateInput}
              onChange={(event) => setDateInput(event.target.value)}
              step={1}
            />

            {dateToTimestamp ? (
              <div className="grid gap-x-8 gap-y-2 text-sm md:grid-cols-2">
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_seconds}</span><span className="tabular-nums">{dateToTimestamp.seconds}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_millis}</span><span className="tabular-nums">{dateToTimestamp.milliseconds}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_micros}</span><span className="tabular-nums">{dateToTimestamp.microseconds}</span></div>
                <div className="flex gap-2"><span className="w-28 shrink-0 font-semibold">{timestampLanguageText.label_nanos}</span><span className="tabular-nums">{dateToTimestamp.nanoseconds}</span></div>
              </div>
            ) : (
              <p className="text-sm text-red-500">{timestampLanguageText.invalid_date}</p>
            )}
          </section>

          <div className="border-t border-orange-200/60" />

          <section className="py-6">
            <h3 className="mb-2 text-lg font-semibold tracking-tight">{timestampLanguageText.what_is_unix_timestamp_title}</h3>
            <div className="space-y-2 text-sm leading-6 opacity-90">
              <p>{timestampLanguageText.what_is_unix_timestamp_p1}</p>
              <p>{timestampLanguageText.what_is_unix_timestamp_p2}</p>
              <p>{timestampLanguageText.what_is_unix_timestamp_p3}</p>
            </div>
          </section>

          <div className="border-t border-orange-200/60" />

          <section className="py-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold tracking-tight">{timestampLanguageText.code_examples_title}</h3>
              <p className="mt-1 text-sm opacity-90">
                {timestampLanguageText.code_examples_desc} <code>1800000000</code>.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="mb-1 text-sm font-semibold">JavaScript</div>
                <pre className="overflow-auto rounded-md bg-black/80 p-3 text-xs text-white">
{`// now (seconds)
Math.floor(Date.now() / 1000)

// epoch -> date
new Date(1800000000 * 1000).toISOString()`}
                </pre>
              </div>

              <div>
                <div className="mb-1 text-sm font-semibold">Python</div>
                <pre className="overflow-auto rounded-md bg-black/80 p-3 text-xs text-white">
{`import time

# now (seconds)
int(time.time())

# epoch -> date (local)
time.ctime(1800000000)`}
                </pre>
              </div>

              <div>
                <div className="mb-1 text-sm font-semibold">Go</div>
                <pre className="overflow-auto rounded-md bg-black/80 p-3 text-xs text-white">
{`package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println(time.Now().Unix())
  fmt.Println(time.Unix(1800000000, 0).UTC())
}`}
                </pre>
              </div>

              <div>
                <div className="mb-1 text-sm font-semibold">SQL (PostgreSQL)</div>
                <pre className="overflow-auto rounded-md bg-black/80 p-3 text-xs text-white">
{`-- now (seconds)
SELECT EXTRACT(EPOCH FROM now());

-- epoch -> timestamp
SELECT TO_TIMESTAMP(1800000000);`}
                </pre>
              </div>

              <div>
                <div className="mb-1 text-sm font-semibold">Unix/Linux shell</div>
                <pre className="overflow-auto rounded-md bg-black/80 p-3 text-xs text-white">
{`date +%s
date -d @1800000000`}
                </pre>
              </div>

              <div>
                <div className="mb-1 text-sm font-semibold">macOS</div>
                <pre className="overflow-auto rounded-md bg-black/80 p-3 text-xs text-white">
{`date +%s
date -j -r 1800000000`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </Container>
      <Footer
        locale={locale}
        description={indexLanguageText.description}
        footerText={footerLanguageText}
      />
    </>
  );
};

export default PageComponent;
