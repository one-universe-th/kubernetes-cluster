import http from "k6/http";
import { sleep } from "k6";

export default function () {
  const random = Math.floor(Math.random() * 10000);
  http.get(`http://localhost:8080/api/user/${random}`);
  sleep(1);
}
