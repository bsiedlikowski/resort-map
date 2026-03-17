#!/bin/bash
MAP="map.ascii"; BOOKINGS="bookings.json"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --map) MAP="$2"; shift 2 ;;
    --bookings) BOOKINGS="$2"; shift 2 ;;
    *) echo "Nieznany argument: $1"; exit 1 ;;
  esac
done

ABS_MAP="$(pwd)/$MAP"
ABS_BOOKINGS="$(pwd)/$BOOKINGS"

trap 'kill $(jobs -p)' EXIT

npm --prefix frontend run dev &
npm --prefix backend run start -- --map "$ABS_MAP" --bookings "$ABS_BOOKINGS"

wait