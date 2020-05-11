const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  id: "2.4",
  type: "object",
  patternProperties: {
    "^[a-zA-Z0-9._-]+$": {
      $ref: "#/definitions/service"
    }
  },
  additionalProperties: false,
  definitions: {
    service: {
      id: "#/definitions/service",
      type: "object",

      properties: {
        blkio_config: {
          type: "object",
          properties: {
            device_read_bps: {
              type: "array",
              items: { $ref: "#/definitions/blkio_limit" }
            },
            device_read_iops: {
              type: "array",
              items: { $ref: "#/definitions/blkio_limit" }
            },
            device_write_bps: {
              type: "array",
              items: { $ref: "#/definitions/blkio_limit" }
            },
            device_write_iops: {
              type: "array",
              items: { $ref: "#/definitions/blkio_limit" }
            },
            weight: { type: "integer" },
            weight_device: {
              type: "array",
              items: { $ref: "#/definitions/blkio_weight" }
            }
          },
          additionalProperties: false
        },

        build: {
          oneOf: [
            { type: "string" },
            {
              type: "object",
              properties: {
                context: { type: "string" },
                dockerfile: { type: "string" },
                args: { $ref: "#/definitions/list_or_dict" },
                labels: { $ref: "#/definitions/labels" },
                cache_from: { $ref: "#/definitions/list_of_strings" },
                network: { type: "string" },
                target: { type: "string" },
                shm_size: { type: ["integer", "string"] },
                extra_hosts: { $ref: "#/definitions/list_or_dict" },
                isolation: { type: "string" }
              },
              additionalProperties: false
            }
          ]
        },
        cap_add: { $ref: "#/definitions/list_of_strings" },
        cap_drop: { $ref: "#/definitions/list_of_strings" },
        cgroup_parent: { type: "string" },
        command: {
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } }
          ]
        },
        container_name: { type: "string" },
        cpu_count: { type: "integer", minimum: 0 },
        cpu_percent: { type: "integer", minimum: 0, maximum: 100 },
        cpu_shares: { type: ["number", "string"] },
        cpu_quota: { type: ["number", "string"] },
        cpu_period: { type: ["number", "string"] },
        cpu_rt_period: { type: ["number", "string"] },
        cpu_rt_runtime: { type: ["number", "string"] },
        cpus: { type: "number", minimum: 0 },
        cpuset: { type: "string" },
        depends_on: {
          oneOf: [
            { $ref: "#/definitions/list_of_strings" },
            {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[a-zA-Z0-9._-]+$": {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    condition: {
                      type: "string",
                      enum: ["service_started", "service_healthy"]
                    }
                  },
                  required: ["condition"]
                }
              }
            }
          ]
        },
        device_cgroup_rules: { $ref: "#/definitions/list_of_strings" },
        devices: { $ref: "#/definitions/list_of_strings" },
        dns_opt: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        dns: { $ref: "#/definitions/string_or_list" },
        dns_search: { $ref: "#/definitions/string_or_list" },
        domainname: { type: "string" },
        entrypoint: {
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } }
          ]
        },
        env_file: { $ref: "#/definitions/string_or_list" },
        environment: { $ref: "#/definitions/list_or_dict" },

        expose: {
          type: "array",
          items: {
            type: ["string", "number"],
            format: "expose"
          },
          uniqueItems: true
        },

        extends: {
          oneOf: [
            {
              type: "string"
            },
            {
              type: "object",

              properties: {
                service: { type: "string" },
                file: { type: "string" }
              },
              required: ["service"],
              additionalProperties: false
            }
          ]
        },

        external_links: { $ref: "#/definitions/list_of_strings" },
        extra_hosts: { $ref: "#/definitions/list_or_dict" },
        group_add: {
          type: "array",
          items: {
            type: ["string", "number"]
          },
          uniqueItems: true
        },
        healthcheck: { $ref: "#/definitions/healthcheck" },
        hostname: { type: "string" },
        image: { type: "string" },
        init: { type: ["boolean", "string"] },
        ipc: { type: "string" },
        isolation: { type: "string" },
        labels: { $ref: "#/definitions/labels" },
        links: { $ref: "#/definitions/list_of_strings" },

        logging: {
          type: "object",

          properties: {
            driver: { type: "string" },
            options: { type: "object" }
          },
          additionalProperties: false
        },

        mac_address: { type: "string" },
        mem_limit: { type: ["number", "string"] },
        mem_reservation: { type: ["string", "integer"] },
        mem_swappiness: { type: "integer" },
        memswap_limit: { type: ["number", "string"] },
        network_mode: { type: "string" },

        networks: {
          oneOf: [
            { $ref: "#/definitions/list_of_strings" },
            {
              type: "object",
              patternProperties: {
                "^[a-zA-Z0-9._-]+$": {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        aliases: { $ref: "#/definitions/list_of_strings" },
                        ipv4_address: { type: "string" },
                        ipv6_address: { type: "string" },
                        link_local_ips: {
                          $ref: "#/definitions/list_of_strings"
                        },
                        priority: { type: "number" }
                      },
                      additionalProperties: false
                    },
                    { type: "null" }
                  ]
                }
              },
              additionalProperties: false
            }
          ]
        },
        oom_kill_disable: { type: "boolean" },
        oom_score_adj: {
          type: "integer",
          minimum: -1000,
          maximum: 1000
        },
        pid: { type: ["string", "null"] },
        platform: { type: "string" },
        ports: {
          type: "array",
          items: {
            type: ["string", "number"],
            format: "ports"
          },
          uniqueItems: true
        },
        privileged: { type: "boolean" },
        read_only: { type: "boolean" },
        restart: { type: "string" },
        runtime: { type: "string" },
        scale: { type: "integer" },
        security_opt: { $ref: "#/definitions/list_of_strings" },
        shm_size: { type: ["number", "string"] },
        sysctls: { $ref: "#/definitions/list_or_dict" },
        pids_limit: { type: ["number", "string"] },
        stdin_open: { type: "boolean" },
        stop_grace_period: { type: "string", format: "duration" },
        stop_signal: { type: "string" },
        storage_opt: { type: "object" },
        tmpfs: { $ref: "#/definitions/string_or_list" },
        tty: { type: "boolean" },
        ulimits: {
          type: "object",
          patternProperties: {
            "^[a-z]+$": {
              oneOf: [
                { type: "integer" },
                {
                  type: "object",
                  properties: {
                    hard: { type: "integer" },
                    soft: { type: "integer" }
                  },
                  required: ["soft", "hard"],
                  additionalProperties: false
                }
              ]
            }
          }
        },
        user: { type: "string" },
        userns_mode: { type: "string" },
        volumes: {
          type: "array",
          items: {
            oneOf: [
              { type: "string" },
              {
                type: "object",
                required: ["type"],
                additionalProperties: false,
                properties: {
                  type: { type: "string" },
                  source: { type: "string" },
                  target: { type: "string" },
                  read_only: { type: "boolean" },
                  consistency: { type: "string" },
                  bind: {
                    type: "object",
                    properties: {
                      propagation: { type: "string" }
                    }
                  },
                  volume: {
                    type: "object",
                    properties: {
                      nocopy: { type: "boolean" }
                    }
                  },
                  tmpfs: {
                    type: "object",
                    properties: {
                      size: { type: ["integer", "string"] }
                    }
                  }
                }
              }
            ],
            uniqueItems: true
          }
        },
        volume_driver: { type: "string" },
        volumes_from: { $ref: "#/definitions/list_of_strings" },
        working_dir: { type: "string" }
      },

      dependencies: {
        memswap_limit: ["mem_limit"]
      },
      patternProperties: { "^x-": {} },
      additionalProperties: false
    },

    healthcheck: {
      id: "#/definitions/healthcheck",
      type: "object",
      additionalProperties: false,
      properties: {
        disable: { type: "boolean" },
        interval: { type: "string" },
        retries: { type: "number" },
        start_period: { type: "string" },
        test: {
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } }
          ]
        },
        timeout: { type: "string" }
      }
    },

    network: {
      id: "#/definitions/network",
      type: "object",
      properties: {
        driver: { type: "string" },
        driver_opts: {
          type: "object",
          patternProperties: {
            "^.+$": { type: ["string", "number"] }
          }
        },
        ipam: {
          type: "object",
          properties: {
            driver: { type: "string" },
            config: {
              type: "array",
              items: { $ref: "#/definitions/ipam_config" }
            },
            options: {
              type: "object",
              patternProperties: {
                "^.+$": { type: "string" }
              },
              additionalProperties: false
            }
          },
          additionalProperties: false
        },
        external: {
          type: ["boolean", "object"],
          properties: {
            name: { type: "string" }
          },
          additionalProperties: false
        },
        internal: { type: "boolean" },
        enable_ipv6: { type: "boolean" },
        labels: { $ref: "#/definitions/labels" },
        name: { type: "string" }
      },
      patternProperties: { "^x-": {} },
      additionalProperties: false
    },

    ipam_config: {
      id: "#/definitions/ipam_config",
      type: "object",
      properties: {
        subnet: { type: "string" },
        ip_range: { type: "string" },
        gateway: { type: "string" },
        aux_addresses: {
          type: "object",
          patternProperties: {
            "^.+$": { type: "string" }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    },

    volume: {
      id: "#/definitions/volume",
      type: ["object", "null"],
      properties: {
        driver: { type: "string" },
        driver_opts: {
          type: "object",
          patternProperties: {
            "^.+$": { type: ["string", "number"] }
          }
        },
        external: {
          type: ["boolean", "object"],
          properties: {
            name: { type: "string" }
          },
          additionalProperties: false
        },
        labels: { $ref: "#/definitions/labels" },
        name: { type: "string" }
      },
      patternProperties: { "^x-": {} },
      additionalProperties: false
    },

    string_or_list: {
      oneOf: [{ type: "string" }, { $ref: "#/definitions/list_of_strings" }]
    },

    list_of_strings: {
      type: "array",
      items: { type: "string" },
      uniqueItems: true
    },

    list_or_dict: {
      oneOf: [
        {
          type: "object",
          patternProperties: {
            ".+": {
              type: ["string", "number", "null"]
            }
          },
          additionalProperties: false
        },
        { type: "array", items: { type: "string" }, uniqueItems: true }
      ]
    },

    labels: {
      oneOf: [
        {
          type: "object",
          patternProperties: {
            ".+": {
              type: "string"
            }
          },
          additionalProperties: false
        },
        { type: "array", items: { type: "string" }, uniqueItems: true }
      ]
    },

    blkio_limit: {
      type: "object",
      properties: {
        path: { type: "string" },
        rate: { type: ["integer", "string"] }
      },
      additionalProperties: false
    },
    blkio_weight: {
      type: "object",
      properties: {
        path: { type: "string" },
        weight: { type: "integer" }
      },
      additionalProperties: false
    },

    constraints: {
      service: {
        id: "#/definitions/constraints/service",
        anyOf: [{ required: ["build"] }, { required: ["image"] }],
        properties: {
          build: {
            required: ["context"]
          }
        }
      }
    }
  }
};

export default schema;
