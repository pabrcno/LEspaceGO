import * as THREE from "three";
import { Ref, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    pCube1_lambert1_0002: THREE.Mesh;
    pCube2_lambert1_0002: THREE.Mesh;
    pCube3_lambert1_0002: THREE.Mesh;
    pCube4_lambert1_0002: THREE.Mesh;
    pCube5_lambert1_0002: THREE.Mesh;
    pCube6_lambert1_0002: THREE.Mesh;
    pCube7_lambert1_0002: THREE.Mesh;
    pCube10_lambert1_0: THREE.Mesh;
    pCube1_lambert1_0003: THREE.Mesh;
    pCube2_lambert1_0003: THREE.Mesh;
    pCube3_lambert1_0003: THREE.Mesh;
    pCube4_lambert1_0003: THREE.Mesh;
    pCube5_lambert1_0003: THREE.Mesh;
    pCube6_lambert1_0003: THREE.Mesh;
    pCube7_lambert1_0003: THREE.Mesh;
    pCube11_lambert1_0: THREE.Mesh;
    pCube1_lambert1_0004: THREE.Mesh;
    pCube2_lambert1_0004: THREE.Mesh;
    pCube3_lambert1_0004: THREE.Mesh;
    pCube4_lambert1_0004: THREE.Mesh;
    pCube5_lambert1_0004: THREE.Mesh;
    pCube6_lambert1_0004: THREE.Mesh;
    pCube7_lambert1_0004: THREE.Mesh;
    pCube12_lambert1_0: THREE.Mesh;
    pCube1_lambert1_0005: THREE.Mesh;
    pCube2_lambert1_0005: THREE.Mesh;
    pCube3_lambert1_0005: THREE.Mesh;
    pCube4_lambert1_0005: THREE.Mesh;
    pCube5_lambert1_0005: THREE.Mesh;
    pCube6_lambert1_0005: THREE.Mesh;
    pCube7_lambert1_0005: THREE.Mesh;
    pCube13_lambert1_0: THREE.Mesh;
    pCube1_lambert1_0: THREE.Mesh;
    pCube2_lambert1_0: THREE.Mesh;
    pCube3_lambert1_0: THREE.Mesh;
    pCube4_lambert1_0: THREE.Mesh;
    pCube5_lambert1_0: THREE.Mesh;
    pCube6_lambert1_0: THREE.Mesh;
    pCube7_lambert1_0: THREE.Mesh;
    pCube8_lambert1_0: THREE.Mesh;
    pCube1_lambert1_0001: THREE.Mesh;
    pCube2_lambert1_0001: THREE.Mesh;
    pCube3_lambert1_0001: THREE.Mesh;
    pCube4_lambert1_0001: THREE.Mesh;
    pCube5_lambert1_0001: THREE.Mesh;
    pCube6_lambert1_0001: THREE.Mesh;
    pCube7_lambert1_0001: THREE.Mesh;
    pCube9_lambert1_0: THREE.Mesh;
    pSphere1_lambert1_0: THREE.Mesh;
  };
  materials: {
    defaultMat: THREE.MeshStandardMaterial;
    lambert1: THREE.MeshStandardMaterial;
  };
};

export function SquidMesh(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF("/squid.glb") as GLTFResult;
  const { actions } = useAnimations<THREE.AnimationClip>(animations, group);
  useEffect(() => {
    actions["Take 001"]?.play();
  }, [actions]);
  return (
    <group
      ref={group as Ref<THREE.Group>}
      {...props}
      dispose={null}
      scale={props.scale ?? [0.1, 0.1, 0.1]}
    >
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="LPOBJcleanermaterialmergergles" />
        </group>
        <group
          name="Sketchfab_model002"
          position={[43.527, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group
            name="bb70507810fa4758ac5e6e3fa82c1eeafbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2001">
              <group name="RootNode002">
                <group
                  name="pCube10"
                  position={[-13.286, 0, -5.798]}
                  rotation={[-Math.PI, 0.754, -Math.PI]}
                >
                  <group
                    name="pCube1002"
                    position={[0.456, 0.935, 0]}
                    rotation={[0, 0, 0.41]}
                    scale={[1.019, 1.019, 1]}
                  >
                    <mesh
                      name="pCube1_lambert1_0002"
                      geometry={nodes.pCube1_lambert1_0002.geometry}
                      material={materials.defaultMat}
                    />
                    <group
                      name="pCube2002"
                      position={[0.753, -0.705, 0]}
                      rotation={[0, 0, 0.41]}
                    >
                      <mesh
                        name="pCube2_lambert1_0002"
                        geometry={nodes.pCube2_lambert1_0002.geometry}
                        material={materials.defaultMat}
                      />
                      <group
                        name="pCube3002"
                        position={[1.094, -2.346, 0]}
                        rotation={[0, 0, 0.41]}
                      >
                        <mesh
                          name="pCube3_lambert1_0002"
                          geometry={nodes.pCube3_lambert1_0002.geometry}
                          material={materials.defaultMat}
                        />
                        <group
                          name="pCube4002"
                          position={[1.435, -3.981, 0]}
                          rotation={[0, 0, 0.41]}
                        >
                          <mesh
                            name="pCube4_lambert1_0002"
                            geometry={nodes.pCube4_lambert1_0002.geometry}
                            material={materials.defaultMat}
                          />
                          <group
                            name="pCube5002"
                            position={[2.245, -5.351, 0]}
                            rotation={[0, 0, 0.41]}
                            scale={[0.963, 0.963, 1]}
                          >
                            <mesh
                              name="pCube5_lambert1_0002"
                              geometry={nodes.pCube5_lambert1_0002.geometry}
                              material={materials.defaultMat}
                            />
                            <group
                              name="pCube6002"
                              position={[2.118, -7.264, 0]}
                              rotation={[0, 0, 0.41]}
                            >
                              <mesh
                                name="pCube6_lambert1_0002"
                                geometry={nodes.pCube6_lambert1_0002.geometry}
                                material={materials.defaultMat}
                              />
                              <group
                                name="pCube7002"
                                position={[2.459, -8.903, 0]}
                                rotation={[0, 0, 0.41]}
                              >
                                <mesh
                                  name="pCube7_lambert1_0002"
                                  geometry={nodes.pCube7_lambert1_0002.geometry}
                                  material={materials.defaultMat}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <mesh
                    name="pCube10_lambert1_0"
                    geometry={nodes.pCube10_lambert1_0.geometry}
                    material={materials.lambert1}
                  />
                </group>
                <group
                  name="pCube11"
                  position={[-14.603, 0, 0.07]}
                  rotation={[Math.PI, -0.032, Math.PI]}
                >
                  <group
                    name="pCube1003"
                    position={[0.456, 0.935, 0]}
                    rotation={[0, 0, 0.41]}
                    scale={[1.019, 1.019, 1]}
                  >
                    <mesh
                      name="pCube1_lambert1_0003"
                      geometry={nodes.pCube1_lambert1_0003.geometry}
                      material={materials.defaultMat}
                    />
                    <group
                      name="pCube2003"
                      position={[0.753, -0.705, 0]}
                      rotation={[0, 0, 0.41]}
                    >
                      <mesh
                        name="pCube2_lambert1_0003"
                        geometry={nodes.pCube2_lambert1_0003.geometry}
                        material={materials.defaultMat}
                      />
                      <group
                        name="pCube3003"
                        position={[1.094, -2.346, 0]}
                        rotation={[0, 0, 0.41]}
                      >
                        <mesh
                          name="pCube3_lambert1_0003"
                          geometry={nodes.pCube3_lambert1_0003.geometry}
                          material={materials.defaultMat}
                        />
                        <group
                          name="pCube4003"
                          position={[1.435, -3.981, 0]}
                          rotation={[0, 0, 0.41]}
                        >
                          <mesh
                            name="pCube4_lambert1_0003"
                            geometry={nodes.pCube4_lambert1_0003.geometry}
                            material={materials.defaultMat}
                          />
                          <group
                            name="pCube5003"
                            position={[2.245, -5.351, 0]}
                            rotation={[0, 0, 0.41]}
                            scale={[0.963, 0.963, 1]}
                          >
                            <mesh
                              name="pCube5_lambert1_0003"
                              geometry={nodes.pCube5_lambert1_0003.geometry}
                              material={materials.defaultMat}
                            />
                            <group
                              name="pCube6003"
                              position={[2.118, -7.264, 0]}
                              rotation={[0, 0, 0.41]}
                            >
                              <mesh
                                name="pCube6_lambert1_0003"
                                geometry={nodes.pCube6_lambert1_0003.geometry}
                                material={materials.defaultMat}
                              />
                              <group
                                name="pCube7003"
                                position={[2.459, -8.903, 0]}
                                rotation={[0, 0, 0.41]}
                              >
                                <mesh
                                  name="pCube7_lambert1_0003"
                                  geometry={nodes.pCube7_lambert1_0003.geometry}
                                  material={materials.defaultMat}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <mesh
                    name="pCube11_lambert1_0"
                    geometry={nodes.pCube11_lambert1_0.geometry}
                    material={materials.lambert1}
                  />
                </group>
                <group
                  name="pCube12"
                  position={[-1.363, 0, 5.54]}
                  rotation={[0, -Math.PI / 4, 0]}
                >
                  <group
                    name="pCube1004"
                    position={[0.456, 0.935, 0]}
                    rotation={[0, 0, 0.41]}
                    scale={[1.019, 1.019, 1]}
                  >
                    <mesh
                      name="pCube1_lambert1_0004"
                      geometry={nodes.pCube1_lambert1_0004.geometry}
                      material={materials.defaultMat}
                    />
                    <group
                      name="pCube2004"
                      position={[0.753, -0.705, 0]}
                      rotation={[0, 0, 0.41]}
                    >
                      <mesh
                        name="pCube2_lambert1_0004"
                        geometry={nodes.pCube2_lambert1_0004.geometry}
                        material={materials.defaultMat}
                      />
                      <group
                        name="pCube3004"
                        position={[1.094, -2.346, 0]}
                        rotation={[0, 0, 0.41]}
                      >
                        <mesh
                          name="pCube3_lambert1_0004"
                          geometry={nodes.pCube3_lambert1_0004.geometry}
                          material={materials.defaultMat}
                        />
                        <group
                          name="pCube4004"
                          position={[1.435, -3.981, 0]}
                          rotation={[0, 0, 0.41]}
                        >
                          <mesh
                            name="pCube4_lambert1_0004"
                            geometry={nodes.pCube4_lambert1_0004.geometry}
                            material={materials.defaultMat}
                          />
                          <group
                            name="pCube5004"
                            position={[2.245, -5.351, 0]}
                            rotation={[0, 0, 0.41]}
                            scale={[0.963, 0.963, 1]}
                          >
                            <mesh
                              name="pCube5_lambert1_0004"
                              geometry={nodes.pCube5_lambert1_0004.geometry}
                              material={materials.defaultMat}
                            />
                            <mesh
                              name="pCube6_lambert1_0004"
                              geometry={nodes.pCube6_lambert1_0004.geometry}
                              material={materials.defaultMat}
                              position={[2.118, -7.264, 0]}
                              rotation={[0, 0, 0.41]}
                            />
                            <mesh
                              name="pCube7_lambert1_0004"
                              geometry={nodes.pCube7_lambert1_0004.geometry}
                              material={materials.defaultMat}
                              position={[7.925, -14.446, 0]}
                              rotation={[0, 0, 0.821]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <mesh
                    name="pCube12_lambert1_0"
                    geometry={nodes.pCube12_lambert1_0.geometry}
                    material={materials.lambert1}
                  />
                </group>
                <group
                  name="pCube13"
                  position={[-13.068, 0, 5.68]}
                  rotation={[Math.PI, -0.817, Math.PI]}
                >
                  <group
                    name="pCube1005"
                    position={[0.456, 0.935, 0]}
                    rotation={[0, 0, 0.41]}
                    scale={[1.019, 1.019, 1]}
                  >
                    <mesh
                      name="pCube1_lambert1_0005"
                      geometry={nodes.pCube1_lambert1_0005.geometry}
                      material={materials.defaultMat}
                    />
                    <group
                      name="pCube2005"
                      position={[0.753, -0.705, 0]}
                      rotation={[0, 0, 0.41]}
                    >
                      <mesh
                        name="pCube2_lambert1_0005"
                        geometry={nodes.pCube2_lambert1_0005.geometry}
                        material={materials.defaultMat}
                      />
                      <group
                        name="pCube3005"
                        position={[1.094, -2.346, 0]}
                        rotation={[0, 0, 0.41]}
                      >
                        <mesh
                          name="pCube3_lambert1_0005"
                          geometry={nodes.pCube3_lambert1_0005.geometry}
                          material={materials.defaultMat}
                        />
                        <group
                          name="pCube4005"
                          position={[1.435, -3.981, 0]}
                          rotation={[0, 0, 0.41]}
                        >
                          <mesh
                            name="pCube4_lambert1_0005"
                            geometry={nodes.pCube4_lambert1_0005.geometry}
                            material={materials.defaultMat}
                          />
                          <group
                            name="pCube5005"
                            position={[2.245, -5.351, 0]}
                            rotation={[0, 0, 0.41]}
                            scale={[0.963, 0.963, 1]}
                          >
                            <mesh
                              name="pCube5_lambert1_0005"
                              geometry={nodes.pCube5_lambert1_0005.geometry}
                              material={materials.defaultMat}
                            />
                            <group
                              name="pCube6005"
                              position={[2.118, -7.264, 0]}
                              rotation={[0, 0, 0.41]}
                            >
                              <mesh
                                name="pCube6_lambert1_0005"
                                geometry={nodes.pCube6_lambert1_0005.geometry}
                                material={materials.defaultMat}
                              />
                              <mesh
                                name="pCube7_lambert1_0005"
                                geometry={nodes.pCube7_lambert1_0005.geometry}
                                material={materials.defaultMat}
                                position={[2.459, -8.903, 0]}
                                rotation={[0, 0, 0.41]}
                              />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <mesh
                    name="pCube13_lambert1_0"
                    geometry={nodes.pCube13_lambert1_0.geometry}
                    material={materials.lambert1}
                  />
                </group>
                <group name="pCube8" position={[0.064, 0, -0.085]}>
                  <group
                    name="pCube1"
                    position={[0.456, 0.935, 0]}
                    rotation={[0, 0, 0.41]}
                    scale={[1.019, 1.019, 1]}
                  >
                    <mesh
                      name="pCube1_lambert1_0"
                      geometry={nodes.pCube1_lambert1_0.geometry}
                      material={materials.defaultMat}
                    />
                    <group
                      name="pCube2"
                      position={[0.753, -0.705, 0]}
                      rotation={[0, 0, 0.41]}
                    >
                      <mesh
                        name="pCube2_lambert1_0"
                        geometry={nodes.pCube2_lambert1_0.geometry}
                        material={materials.defaultMat}
                      />
                      <group
                        name="pCube3"
                        position={[1.094, -2.346, 0]}
                        rotation={[0, 0, 0.41]}
                      >
                        <mesh
                          name="pCube3_lambert1_0"
                          geometry={nodes.pCube3_lambert1_0.geometry}
                          material={materials.defaultMat}
                        />
                        <group
                          name="pCube4"
                          position={[1.435, -3.981, 0]}
                          rotation={[0, 0, 0.41]}
                        >
                          <mesh
                            name="pCube4_lambert1_0"
                            geometry={nodes.pCube4_lambert1_0.geometry}
                            material={materials.defaultMat}
                          />
                          <group
                            name="pCube5"
                            position={[2.245, -5.351, 0]}
                            rotation={[0, 0, 0.41]}
                            scale={[0.963, 0.963, 1]}
                          >
                            <mesh
                              name="pCube5_lambert1_0"
                              geometry={nodes.pCube5_lambert1_0.geometry}
                              material={materials.defaultMat}
                            />
                            <group
                              name="pCube6"
                              position={[2.118, -7.264, 0]}
                              rotation={[0, 0, 0.41]}
                            >
                              <mesh
                                name="pCube6_lambert1_0"
                                geometry={nodes.pCube6_lambert1_0.geometry}
                                material={materials.defaultMat}
                              />
                              <group
                                name="pCube7"
                                position={[2.459, -8.903, 0]}
                                rotation={[0, 0, 0.41]}
                              >
                                <mesh
                                  name="pCube7_lambert1_0"
                                  geometry={nodes.pCube7_lambert1_0.geometry}
                                  material={materials.defaultMat}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <mesh
                    name="pCube8_lambert1_0"
                    geometry={nodes.pCube8_lambert1_0.geometry}
                    material={materials.lambert1}
                  />
                </group>
                <group
                  name="pCube9"
                  position={[-1.363, 0, -5.785]}
                  rotation={[0, Math.PI / 4, 0]}
                >
                  <group
                    name="pCube1001"
                    position={[0.456, 0.935, 0]}
                    rotation={[0, 0, 0.41]}
                    scale={[1.019, 1.019, 1]}
                  >
                    <mesh
                      name="pCube1_lambert1_0001"
                      geometry={nodes.pCube1_lambert1_0001.geometry}
                      material={materials.defaultMat}
                    />
                    <group
                      name="pCube2001"
                      position={[0.753, -0.705, 0]}
                      rotation={[0, 0, 0.41]}
                    >
                      <mesh
                        name="pCube2_lambert1_0001"
                        geometry={nodes.pCube2_lambert1_0001.geometry}
                        material={materials.defaultMat}
                      />
                      <group
                        name="pCube3001"
                        position={[1.094, -2.346, 0]}
                        rotation={[0, 0, 0.41]}
                      >
                        <mesh
                          name="pCube3_lambert1_0001"
                          geometry={nodes.pCube3_lambert1_0001.geometry}
                          material={materials.defaultMat}
                        />
                        <group
                          name="pCube4001"
                          position={[1.435, -3.981, 0]}
                          rotation={[0, 0, 0.41]}
                        >
                          <mesh
                            name="pCube4_lambert1_0001"
                            geometry={nodes.pCube4_lambert1_0001.geometry}
                            material={materials.defaultMat}
                          />
                          <group
                            name="pCube5001"
                            position={[2.245, -5.351, 0]}
                            rotation={[0, 0, 0.41]}
                            scale={[0.963, 0.963, 1]}
                          >
                            <mesh
                              name="pCube5_lambert1_0001"
                              geometry={nodes.pCube5_lambert1_0001.geometry}
                              material={materials.defaultMat}
                            />
                            <group
                              name="pCube6001"
                              position={[2.118, -7.264, 0]}
                              rotation={[0, 0, 0.41]}
                            >
                              <mesh
                                name="pCube6_lambert1_0001"
                                geometry={nodes.pCube6_lambert1_0001.geometry}
                                material={materials.defaultMat}
                              />
                              <group
                                name="pCube7001"
                                position={[2.459, -8.903, 0]}
                                rotation={[0, 0, 0.41]}
                              >
                                <mesh
                                  name="pCube7_lambert1_0001"
                                  geometry={nodes.pCube7_lambert1_0001.geometry}
                                  material={materials.defaultMat}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <mesh
                    name="pCube9_lambert1_0"
                    geometry={nodes.pCube9_lambert1_0.geometry}
                    material={materials.lambert1}
                  />
                </group>
                <group
                  name="pSphere1"
                  position={[-7.414, 1.536, -0.12]}
                  scale={[6.311, 3.946, 6.311]}
                >
                  <mesh
                    name="pSphere1_lambert1_0"
                    geometry={nodes.pSphere1_lambert1_0.geometry}
                    material={materials.defaultMat}
                  />
                </group>
                <group
                  name="pSphere2"
                  position={[-8.563, 4.518, 4.585]}
                  rotation={[1.003, 0.019, 0.14]}
                  scale={1.36}
                />
                <group
                  name="pSphere3"
                  position={[-5.438, 4.518, 4.585]}
                  rotation={[1.172, 0.042, -0.262]}
                  scale={1.36}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/squid.glb");
