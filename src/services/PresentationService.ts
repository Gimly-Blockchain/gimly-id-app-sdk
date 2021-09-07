import vc from "@sphereon/rn-vc-js";
import { v4 as uuid } from "uuid";

import { Ed25519VerificationKey2020 } from "@digitalbazaar/ed25519-verification-key-2020";
import { Ed25519Signature2020 } from "@digitalbazaar/ed25519-signature-2020";
import { Presentation } from "../interfaces/types";

export default class PresentationService {
  public static async createPresentation(
    verifiableCredential: Credential[],
    id: string,
    holder: string
  ) {
    try {
      vc.createPresentation({
        verifiableCredential,
        id,
        holder,
      });
    } catch (error) {
      console.error("Create Credential Error", error);
    }
  }

  public static async signPresentation(
    presentation: Presentation,
    challenge: string
  ) {
    const keyPair = await Ed25519VerificationKey2020.generate();
    const suite = new Ed25519Signature2020({ key: keyPair });

    try {
      await vc.signPresentation({
        presentation,
        suite,
        challenge,
      });
    } catch (error) {
      console.error("Create Credential Error", error);
    }
  }

  public static async verifyPresentation(presentation: Presentation) {
    const keyPair = await Ed25519VerificationKey2020.generate();
    const suite = new Ed25519Signature2020({ key: keyPair });
    const challenge = uuid();

    try {
      await vc.verify({ presentation, challenge, suite });
    } catch (error) {
      console.error("Verify Presentation Error", error);
    }
  }

  public static async verifyUnsignedPresentation(presentation: Presentation) {
    const keyPair = await Ed25519VerificationKey2020.generate();
    const suite = new Ed25519Signature2020({ key: keyPair });

    try {
      await vc.verify({ presentation, suite, unsignedPresentation: true });
    } catch (error) {
      console.error("Verify Unsigned Presentation Error", error);
    }
  }
}
