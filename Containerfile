ARG BASE_IMAGE=registry.access.redhat.com/ubi9/ubi-minimal:9.4
ARG BUILDER_IMAGE=docker.io/golang:1.23.3


FROM ${BUILDER_IMAGE} AS builder

WORKDIR /workspace

COPY . .

RUN echo "Running ls -la" && ls -la
RUN go version
RUN go mod tidy
RUN go build -o /workspace/bin/artemis_backend

FROM ${BASE_IMAGE}

COPY --from=builder /workspace/bin/artemis_backend /usr/local/bin/artemis_backend

CMD ["/usr/local/bin/artemis_backend"]