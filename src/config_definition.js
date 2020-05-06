const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  id: "config_schema_v3.8.json",
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
        deploy: {
          $ref: "#/definitions/deployment"
        },
        build: {
          oneOf: [
            {
              type: "string"
            },
            {
              type: "object",
              properties: {
                context: {
                  type: "string"
                },
                dockerfile: {
                  type: "string"
                },
                args: {
                  $ref: "#/definitions/list_or_dict"
                },
                labels: {
                  $ref: "#/definitions/list_or_dict"
                },
                cache_from: {
                  $ref: "#/definitions/list_of_strings"
                },
                network: {
                  type: "string"
                },
                target: {
                  type: "string"
                },
                shm_size: {
                  type: ["integer", "string"]
                }
              },
              additionalProperties: false
            }
          ]
        },
        cap_add: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        cap_drop: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        cgroup_parent: {
          type: "string"
        },
        command: {
          oneOf: [
            {
              type: "string"
            },
            {
              type: "array",
              items: {
                type: "string"
              }
            }
          ]
        },
        configs: {
          type: "array",
          items: {
            oneOf: [
              {
                type: "string"
              },
              {
                type: "object",
                properties: {
                  source: {
                    type: "string"
                  },
                  target: {
                    type: "string"
                  },
                  uid: {
                    type: "string"
                  },
                  gid: {
                    type: "string"
                  },
                  mode: {
                    type: "number"
                  }
                }
              }
            ]
          }
        },
        container_name: {
          type: "string"
        },
        credential_spec: {
          type: "object",
          properties: {
            config: {
              type: "string"
            },
            file: {
              type: "string"
            },
            registry: {
              type: "string"
            }
          },
          additionalProperties: false
        },
        depends_on: {
          $ref: "#/definitions/list_of_strings"
        },
        devices: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        dns: {
          $ref: "#/definitions/string_or_list"
        },
        dns_search: {
          $ref: "#/definitions/string_or_list"
        },
        domainname: {
          type: "string"
        },
        entrypoint: {
          oneOf: [
            {
              type: "string"
            },
            {
              type: "array",
              items: {
                type: "string"
              }
            }
          ]
        },
        env_file: {
          $ref: "#/definitions/string_or_list"
        },
        environment: {
          $ref: "#/definitions/list_or_dict"
        },
        expose: {
          type: "array",
          items: {
            type: ["string", "number"],
            format: "expose"
          },
          uniqueItems: true
        },
        external_links: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        extra_hosts: {
          $ref: "#/definitions/list_or_dict"
        },
        healthcheck: {
          $ref: "#/definitions/healthcheck"
        },
        hostname: {
          type: "string"
        },
        image: {
          type: "string"
        },
        init: {
          type: "boolean"
        },
        ipc: {
          type: "string"
        },
        isolation: {
          type: "string"
        },
        labels: {
          $ref: "#/definitions/list_or_dict"
        },
        links: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        logging: {
          type: "object",
          properties: {
            driver: {
              type: "string"
            },
            options: {
              type: "object",
              patternProperties: {
                "^.+$": {
                  type: ["string", "number", "null"]
                }
              }
            }
          },
          additionalProperties: false
        },
        mac_address: {
          type: "string"
        },
        network_mode: {
          type: "string"
        },
        networks: {
          oneOf: [
            {
              $ref: "#/definitions/list_of_strings"
            },
            {
              type: "object",
              patternProperties: {
                "^[a-zA-Z0-9._-]+$": {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        aliases: {
                          $ref: "#/definitions/list_of_strings"
                        },
                        ipv4_address: {
                          type: "string"
                        },
                        ipv6_address: {
                          type: "string"
                        }
                      },
                      additionalProperties: false
                    },
                    {
                      type: "null"
                    }
                  ]
                }
              },
              additionalProperties: false
            }
          ]
        },
        pid: {
          type: ["string", "null"]
        },
        ports: {
          type: "array",
          items: {
            oneOf: [
              {
                type: "number",
                format: "ports"
              },
              {
                type: "string",
                format: "ports"
              },
              {
                type: "object",
                properties: {
                  mode: {
                    type: "string"
                  },
                  target: {
                    type: "integer"
                  },
                  published: {
                    type: "integer"
                  },
                  protocol: {
                    type: "string"
                  }
                },
                additionalProperties: false
              }
            ]
          },
          uniqueItems: true
        },
        privileged: {
          type: "boolean"
        },
        read_only: {
          type: "boolean"
        },
        restart: {
          type: "string"
        },
        security_opt: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        },
        shm_size: {
          type: ["number", "string"]
        },
        secrets: {
          type: "array",
          items: {
            oneOf: [
              {
                type: "string"
              },
              {
                type: "object",
                properties: {
                  source: {
                    type: "string"
                  },
                  target: {
                    type: "string"
                  },
                  uid: {
                    type: "string"
                  },
                  gid: {
                    type: "string"
                  },
                  mode: {
                    type: "number"
                  }
                }
              }
            ]
          }
        },
        sysctls: {
          $ref: "#/definitions/list_or_dict"
        },
        stdin_open: {
          type: "boolean"
        },
        stop_grace_period: {
          type: "string",
          format: "duration"
        },
        stop_signal: {
          type: "string"
        },
        tmpfs: {
          $ref: "#/definitions/string_or_list"
        },
        tty: {
          type: "boolean"
        },
        ulimits: {
          type: "object",
          patternProperties: {
            "^[a-z]+$": {
              oneOf: [
                {
                  type: "integer"
                },
                {
                  type: "object",
                  properties: {
                    hard: {
                      type: "integer"
                    },
                    soft: {
                      type: "integer"
                    }
                  },
                  required: ["soft", "hard"],
                  additionalProperties: false
                }
              ]
            }
          }
        },
        user: {
          type: "string"
        },
        userns_mode: {
          type: "string"
        },
        volumes: {
          type: "array",
          items: {
            oneOf: [
              {
                type: "string"
              },
              {
                type: "object",
                required: ["type"],
                properties: {
                  type: {
                    type: "string"
                  },
                  source: {
                    type: "string"
                  },
                  target: {
                    type: "string"
                  },
                  read_only: {
                    type: "boolean"
                  },
                  consistency: {
                    type: "string"
                  },
                  bind: {
                    type: "object",
                    properties: {
                      propagation: {
                        type: "string"
                      }
                    }
                  },
                  volume: {
                    type: "object",
                    properties: {
                      nocopy: {
                        type: "boolean"
                      }
                    }
                  },
                  tmpfs: {
                    type: "object",
                    properties: {
                      size: {
                        type: "integer",
                        minimum: 0
                      }
                    }
                  }
                },
                additionalProperties: false
              }
            ],
            uniqueItems: true
          }
        },
        working_dir: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    healthcheck: {
      id: "#/definitions/healthcheck",
      type: "object",
      additionalProperties: false,
      properties: {
        disable: {
          type: "boolean"
        },
        interval: {
          type: "string",
          format: "duration"
        },
        retries: {
          type: "number"
        },
        test: {
          oneOf: [
            {
              type: "string"
            },
            {
              type: "array",
              items: {
                type: "string"
              }
            }
          ]
        },
        timeout: {
          type: "string",
          format: "duration"
        },
        start_period: {
          type: "string",
          format: "duration"
        }
      }
    },
    deployment: {
      id: "#/definitions/deployment",
      type: ["object", "null"],
      properties: {
        mode: {
          type: "string"
        },
        endpoint_mode: {
          type: "string"
        },
        replicas: {
          type: "integer"
        },
        labels: {
          $ref: "#/definitions/list_or_dict"
        },
        rollback_config: {
          type: "object",
          properties: {
            parallelism: {
              type: "integer"
            },
            delay: {
              type: "string",
              format: "duration"
            },
            failure_action: {
              type: "string"
            },
            monitor: {
              type: "string",
              format: "duration"
            },
            max_failure_ratio: {
              type: "number"
            },
            order: {
              type: "string",
              enum: ["start-first", "stop-first"]
            }
          },
          additionalProperties: false
        },
        update_config: {
          type: "object",
          properties: {
            parallelism: {
              type: "integer"
            },
            delay: {
              type: "string",
              format: "duration"
            },
            failure_action: {
              type: "string"
            },
            monitor: {
              type: "string",
              format: "duration"
            },
            max_failure_ratio: {
              type: "number"
            },
            order: {
              type: "string",
              enum: ["start-first", "stop-first"]
            }
          },
          additionalProperties: false
        },
        resources: {
          type: "object",
          properties: {
            limits: {
              type: "object",
              properties: {
                cpus: {
                  type: "string"
                },
                memory: {
                  type: "string"
                }
              },
              additionalProperties: false
            },
            reservations: {
              type: "object",
              properties: {
                cpus: {
                  type: "string"
                },
                memory: {
                  type: "string"
                },
                generic_resources: {
                  $ref: "#/definitions/generic_resources"
                }
              },
              additionalProperties: false
            }
          },
          additionalProperties: false
        },
        restart_policy: {
          type: "object",
          properties: {
            condition: {
              type: "string"
            },
            delay: {
              type: "string",
              format: "duration"
            },
            max_attempts: {
              type: "integer"
            },
            window: {
              type: "string",
              format: "duration"
            }
          },
          additionalProperties: false
        },
        placement: {
          type: "object",
          properties: {
            constraints: {
              type: "array",
              items: {
                type: "string"
              }
            },
            preferences: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  spread: {
                    type: "string"
                  }
                },
                additionalProperties: false
              }
            },
            max_replicas_per_node: {
              type: "integer"
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    },
    generic_resources: {
      id: "#/definitions/generic_resources",
      type: "array",
      items: {
        type: "object",
        properties: {
          discrete_resource_spec: {
            type: "object",
            properties: {
              kind: {
                type: "string"
              },
              value: {
                type: "number"
              }
            },
            additionalProperties: false
          }
        },
        additionalProperties: false
      }
    },
    network: {
      id: "#/definitions/network",
      type: ["object", "null"],
      properties: {
        name: {
          type: "string"
        },
        driver: {
          type: "string"
        },
        driver_opts: {
          type: "object",
          patternProperties: {
            "^.+$": {
              type: ["string", "number"]
            }
          }
        },
        ipam: {
          type: "object",
          properties: {
            driver: {
              type: "string"
            },
            config: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  subnet: {
                    type: "string"
                  }
                },
                additionalProperties: false
              }
            }
          },
          additionalProperties: false
        },
        external: {
          type: ["boolean", "object"],
          properties: {
            name: {
              type: "string"
            }
          },
          additionalProperties: false
        },
        internal: {
          type: "boolean"
        },
        attachable: {
          type: "boolean"
        },
        labels: {
          $ref: "#/definitions/list_or_dict"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    volume: {
      id: "#/definitions/volume",
      type: ["object", "null"],
      properties: {
        name: {
          type: "string"
        },
        driver: {
          type: "string"
        },
        driver_opts: {
          type: "object",
          patternProperties: {
            "^.+$": {
              type: ["string", "number"]
            }
          }
        },
        external: {
          type: ["boolean", "object"],
          properties: {
            name: {
              type: "string"
            }
          },
          additionalProperties: false
        },
        labels: {
          $ref: "#/definitions/list_or_dict"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    secret: {
      id: "#/definitions/secret",
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        file: {
          type: "string"
        },
        external: {
          type: ["boolean", "object"],
          properties: {
            name: {
              type: "string"
            }
          }
        },
        labels: {
          $ref: "#/definitions/list_or_dict"
        },
        driver: {
          type: "string"
        },
        driver_opts: {
          type: "object",
          patternProperties: {
            "^.+$": {
              type: ["string", "number"]
            }
          }
        },
        template_driver: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    config: {
      id: "#/definitions/config",
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        file: {
          type: "string"
        },
        external: {
          type: ["boolean", "object"],
          properties: {
            name: {
              type: "string"
            }
          }
        },
        labels: {
          $ref: "#/definitions/list_or_dict"
        },
        template_driver: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    string_or_list: {
      oneOf: [
        {
          type: "string"
        },
        {
          $ref: "#/definitions/list_of_strings"
        }
      ]
    },
    list_of_strings: {
      type: "array",
      items: {
        type: "string"
      },
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
        {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        }
      ]
    },
    constraints: {
      service: {
        id: "#/definitions/constraints/service",
        anyOf: [
          {
            required: ["build"]
          },
          {
            required: ["image"]
          }
        ],
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
